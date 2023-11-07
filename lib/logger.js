import path from 'path'
import { fileURLToPath } from 'node:url'
import { env } from '../config.js'
import winston from 'winston'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dir = path.join(__dirname, '../logs')

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const logger = winston.createLogger({
  level: env.DEBUG ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        myFormat
      )
    }),
    new winston.transports.File({
      level: env.DEBUG ? 'none' : 'warn',
      filename: path.join(dir, 'logs.txt'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(dir, 'logs.txt')
    })
  ]
})

export default logger
