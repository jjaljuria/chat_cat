import { config } from 'dotenv'

config()

export const env = {
  SESSION_SECRET: process.env.SESSION_SECRET ?? 'secret',
  DEBUG: process.env.DEBUG ?? false
}
