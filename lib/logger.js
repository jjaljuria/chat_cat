import path from 'path'
import { fileURLToPath } from 'node:url'

import winston from 'winston'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dir = path.join(__dirname, '../logs')

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        myFormat
      )
    }),
    new winston.transports.File({
      filename: path.join(dir, 'logs.txt'),
      level: 'warn',
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
