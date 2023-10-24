import { describe, test } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { prisma } from '../database.js'

describe('Login User', () => {
  test('should show login page', async () => {
    await request(app).get('/login').send().expect(200)
  })
})
