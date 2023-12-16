import { describe, test, vi, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { prisma } from '../database.js'
import encrypt from '../lib/encrypt.js'
import verifyExistUser from '../middlewares/verifyExistUser.js'

vi.mock('../database.js')
vi.mock('../lib/encrypt.js')
vi.mock('../middlewares/verifyExistUser.js', () => {
  return {
    default: vi.fn()
  }
})

describe('create user', () => {
  test('should register a user', async () => {
    const mockUser = {
      nickname: 'superjj',
      email: 'jose@email.com',
      password: '12345'
    }

    prisma.user.create.mockReturnValueOnce(Promise.resolve(mockUser))
    encrypt.mockReturnValueOnce(Promise.resolve(mockUser.password))

    await request(app).post('/user').send(mockUser).expect(202)

    expect(prisma.user.create).toHaveBeenCalledWith({ data: mockUser })
  })

  test('should show message "user exits" when try create a user with same nickname or email', async () => {
    const mockUser = {
      nickname: 'superjj',
      email: 'jose@email.com',
      password: '12345'
    }

    const errorMessage = /Error\swith\screate\suser/i

    prisma.user.create.mockRejectedValueOnce(new Error())

    await request(app).post('/user').send(mockUser)
      .expect(500)
      .expect(errorMessage)
  })

  test('should return the users that match the search text but not the current user', async () => {
    const myId = 1
    const otherId = 2
    const textToFind = 'user'

    const users = [
      {
        id: myId,
        nickname: 'user1'
      },
      {
        id: otherId,
        nickname: 'user2'
      }
    ]

    verifyExistUser.mockImplementationOnce((req, res, next) => {
      req.session.user = myId
      next()
    })
    prisma.user.findMany.mockReturnValueOnce(Promise.resolve(users))
    const response = await request(app).get('/user').query({
      find: textToFind
    }).send()
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.some(user => user.id === myId)).toBe(false)
  })
})
