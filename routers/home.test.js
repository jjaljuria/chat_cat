import { describe, test, vi } from 'vitest'
import request from 'supertest'
import app from '../index.js'

vi.mock('../database.js')
vi.mock('../middlewares/verifyExistUser.js')

describe('Home Page', () => {
  test('should return status code 200', async () => {
    await request(app).get('/').send().expect(200)
  })
})
