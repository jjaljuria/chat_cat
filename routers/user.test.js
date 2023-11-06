import { describe, test, vi, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { prisma } from '../database.js'
import encrypt from '../lib/encrypt.js'

vi.mock('../database.js', () => ({
  prisma: {
    user: {
      create: vi.fn()
    }
  }
}))
vi.mock('../lib/encrypt.js')

describe('create user', () => {
  test('return 200 status code GET /register', async () => {
    await request(app).get('/register').expect(200)
  })

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
})
