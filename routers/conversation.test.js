import { test, describe, vi, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { create, hasConversationWith } from '../services/conversation.js'
import logger from '../lib/logger.js'

vi.mock('../database.js')
vi.mock('../services/conversation.js', () => {
  return {
    create: vi.fn(),
    hasConversationWith: vi.fn()
  }
})

describe('Conversation Router', () => {
  test('should send id, return new conversation and status code 201', async () => {
    const myId = 1
    hasConversationWith.mockReturnValueOnce(Promise.resolve(undefined))

    await request(app).post('/conversation').send({
      id: myId
    })
      .expect(201)
      .expect('Content-Type', /json/)
  })

  test('should send id of an user that already have a conversation with the current user, return the exist conversation and status code 200', async () => {
    const idUser = 2
    const idConversation = 1
    hasConversationWith.mockReturnValueOnce(Promise.resolve({ id: idConversation }))

    const response = await request(app).post('/conversation').send({ id: idUser })
      .expect(200)

    expect(response.body.id).toBe(idConversation)
  })
})
