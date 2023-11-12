import { describe, test, vi, expect } from 'vitest'
import { create } from './conversation.js'
import { prisma } from '../database.js'

vi.mock('../database.js')

describe('Conversation Services', () => {
  describe('Conversation.create', () => {
    test('should defined created', () => {
      expect(create).toBeDefined()
    })

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

      create(myId, otherId)

      expect(prisma.conversation.create).toHaveBeenCalled()
    })
  })
})
