import { describe, test, vi, expect } from 'vitest'
import { create, getAllOf, hasConversationWith, get, createMessage } from './conversation.js'
import { prisma } from '../database.js'

vi.mock('../database.js')

describe('Conversation Services', () => {
  describe('Conversation.create', () => {
    test('should to be defined created', () => {
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

  describe('Conversation.getAllOf', () => {
    test('should getAllOf to be defined', () => {
      expect(getAllOf).toBeDefined()
    })

    test('should return all conversations of an user', async () => {
      const myId = 1
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

      const conversationFound = await getAllOf(myId)

      expect(conversationFound).toEqual(conversations)
    })
  })

  describe('Conversation.has', () => {
    test('should if user already a conversation with the otro user return the conversation else return null', async () => {
      const myId = 1
      const otherId = 2
      const existConversationId = 1

      const result = await hasConversationWith('30955d5f-c925-4dae-85e6-4d0cf61e7bb6', 'f5329e88-f3d7-437f-9937-9f7591353b8d')
      console.log(result)
    })
  })

  describe('Conversation.get', () => {
    test('should when send a id that exist return conversation', async () => {
      const idConversation = 1
      prisma.conversation.findFirst.mockReturnValueOnce(Promise.resolve({ id: idConversation }))

      const res = await get(idConversation)
      expect(res.id).toBeDefined()
    })
    test('should when send a id that not exist return null', async () => {
      const idConversation = 1
      prisma.conversation.findFirst.mockReturnValueOnce(Promise.resolve(null))

      const res = await get(idConversation)
      expect(res).toBeNull()
    })
  })

  describe('Conversation.createMessage', () => {
    test('should set object with text message, id conversation and return Message object', async () => {
      const textMessage = 'hello world'
      const idConversation = 1

      prisma.message.create.mockReturnValueOnce(Promise.resolve({ id: 1, idConversation, text: textMessage }))

      const message = await createMessage({
        idConversation,
        text: textMessage
      })

      expect(message.id).toBeDefined()
      expect(message.text).toBeDefined()
    })
  })
})
