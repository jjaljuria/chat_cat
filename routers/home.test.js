import { describe, test, vi } from 'vitest'
import request from 'supertest'
import app from '../index.js'
import { get } from '../services/user.js'

vi.mock('../database.js')
vi.mock('../middlewares/verifyExistUser.js')
vi.mock('../services/user.js', () => {
  return {
    get: vi.fn()
  }
})

describe('Home Page', () => {
  test('should return status code 200', async () => {
    get.mockReturnValueOnce({ id: 1 })
    await request(app).get('/home').send().expect(200)
  })
})
