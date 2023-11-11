import { vi } from 'vitest'

export const prisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn()
  }
}
