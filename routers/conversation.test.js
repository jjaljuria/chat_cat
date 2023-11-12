import { describe, test, vi, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { prisma } from '../database.js'

vi.mock('../database.js')
vi.mock('../middlewares/verifyExistUser.js')

describe('Conversation Routes', () => {
  test('should create a new conversation into two users', async () => {
    const myId = 1
    const otherId = 2
    const newConversation = {
      id: 1,
      createdAt: '2023-11-12T11:42:59.198Z',
      updatedAt: '2023-11-12T11:42:59.198Z',
      users: [
        {
          idUser: myId,
          idConversation: 1
        },
        {
          idUser: otherId,
          idConversation: 1
        }
      ]
    }

    prisma.conversation.create.mockReturnValueOnce(Promise.resolve(newConversation))

    await request(app).post('/conversation').send({
      id: otherId
    }).expect(201)

    expect(prisma.conversation.create).toHaveBeenCalled()
  })

  test('should get all conversation of a user', async () => {
    const conversations = [
      {
        id: 1,
        createAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        id: 2,
        createAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        id: 2,
        createAt: Date.now(),
        updatedAt: Date.now()
      }

    ]

    prisma.conversation.findMany.mockReturnValueOnce(Promise.resolve(conversations))

    await request(app).get('/conversation').send()
      .expect(200)
  })
})
