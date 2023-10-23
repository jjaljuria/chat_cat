import { describe, test, vi, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { prisma } from '../database.js'

vi.mock('../database.js')

describe('user routes', () => {
  test('return 200 status code GET /user', async () => {
    await request(app).get('/user').expect(200)
  })

  test('should register a user', async () => {
    const mockUser = {
      nickname: 'superjj',
      email: 'jose@email.com',
      password: '12345'
    }

    const spy = vi.fn()

    prisma.user.create = spy

    await request(app).post('/user').send(JSON.stringify(mockUser)).expect(202)

    expect(spy).toHaveBeenCalled()
  })
})
