import { test, describe, vi } from 'vitest'
import request from 'supertest'
import app from '../index.js'

vi.mock('../database.js')

describe('Conversation Router', () => {
  test('should send id, return new conversation and status code 201', async () => {
    const myId = 1
    await request(app).post('/conversation').send({
      id: myId
    })
      .expect(201)
      .expect('Content-Type', /json/)
  })
})
