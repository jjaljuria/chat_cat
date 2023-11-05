import { describe, test, vi } from 'vitest'
import request from 'supertest'
import app from '../index.js'

vi.mock('../middlewares/userVerify.js', () => {
  return {
    default: (req, res, next) => {
      next()
    }
  }
})

describe('Index Page', () => {
  test('should return status code 200', async () => {
    await request(app).get('/').send().expect(200)
  })
})
