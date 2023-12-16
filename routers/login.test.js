import { describe, test, vi } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { prisma } from '../database.js'
import decrypt from '../lib/decrypt.js'

vi.mock('../database.js')
vi.mock('../lib/decrypt.js', () => {
  return { default: vi.fn() }
})

describe('Login User', () => {
  test('should send user and password validates and redirect to /', async () => {
    const user = {
      email: 'jose@email.com',
      password: '12345'
    }

    prisma.user.findUnique.mockReturnValueOnce(Promise.resolve(user))
    decrypt.mockReturnValueOnce(Promise.resolve(true))

    await request(app).post('/login').send(user)
      .expect(202)
  })

  test('should show message with user not found', async () => {
    const user = {
      email: 'jose@email.com',
      password: '12345'
    }
    const userNotFoundMessage = /User\snot\sfound/i

    prisma.user.findUnique.mockReturnValueOnce(Promise.resolve(null))

    await request(app).post('/login').send(user).expect(406).expect(userNotFoundMessage)
  })

  test('should show message with password not match', async () => {
    const user = {
      email: 'jose@email.com',
      password: '12345'
    }
    const passwordNotMatchedMessage = /Password\snot\smatched/i

    prisma.user.findUnique.mockReturnValueOnce(Promise.resolve(user))
    decrypt.mockReturnValueOnce(Promise.resolve(false))

    await request(app).post('/login').send(user).expect(406).expect(passwordNotMatchedMessage)
  })
})
