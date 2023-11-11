import { vi } from 'vitest'

export const prisma = {
  user: {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn()
  }
}
