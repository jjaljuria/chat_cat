import { describe, test, vi, expect } from 'vitest'
import * as userServices from './user.js'
import { prisma } from '../database.js'

vi.mock('../database.js')

describe('User Services', () => {
  describe('user.get', () => {
    test('should user.get to be defined', () => {
      expect(userServices.get).toBeDefined()
    })

    test('should return a user', async () => {
      const myId = 1
      const user = {
        id: myId,
        nickname: 'user',
        email: 'user@email.com',
        password: '12345'
      }

      prisma.user.findFirst.mockReturnValueOnce(Promise.resolve(user))

      const userFound = await userServices.get(myId)

      expect(userFound.id).toBe(myId)
    })
  })
})
