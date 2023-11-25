import { vi } from 'vitest'

export const prisma = {
  user: {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn()
  },
  conversation: {
    findMany: vi.fn(),
    create: vi.fn(),
    findFirst: vi.fn()
  },
  message: {
    create: vi.fn()
  }
}
