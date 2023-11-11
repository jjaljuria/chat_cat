import { describe, test, vi, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { prisma } from '../database.js'

vi.mock('../database.js')
vi.mock('../middlewares/userVerify.js', () => {
  return {
    default: (req, res, next) => {
      next()
    }
  }
})

describe('Index Page', () => {
  test('should return status code 200', async () => {
    await request(app).get('/').send().expect(200)
  })
})

describe('API Rest Index', () => {
  test('should send a text with the nickname or part of it and receive an array with possible users', async () => {
    const textToFind = 'user'
    const usersFound = [
      {
        id: 1,
        nickname: 'user1'
      },
      {
        id: 2,
        nickname: 'user2'
      },
      {
        id: 3,
        nickname: 'user3'
      }
    ]

    prisma.user.findMany.mockReturnValueOnce(Promise.resolve(usersFound))

    const response = await request(app).get('/user')
      .query({
        find: textToFind
      })
      .send()
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual(usersFound)
  })

  test('should return [] if not found any user', async () => {
    const textToFind = 'user'
    const usersFound = []

    prisma.user.findMany.mockReturnValueOnce(Promise.resolve(usersFound))

    const response = await request(app).get('/user')
      .query({
        find: textToFind
      })
      .send()
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual(usersFound)
  })
})
