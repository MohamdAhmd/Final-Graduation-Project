import winston from 'winston'
import dotenv from 'dotenv'
dotenv.config()
export const dateFormat = () => {
  return new Date(Date.now()).toLocaleString()
}
export class LoggerService {
  route: any
  logger: winston.Logger
  constructor(route: any) {
    this.route = route
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} |  ${info.level.toUpperCase()} | ${info.message} | `
        message = info.obj ? message + `data ${JSON.stringify(info.obj)} | ` : message
        return message
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH} / ${route}.log` })
      ]
    })
    this.logger = logger
  }

  async info(message: string, obj: any) {
    this.logger.log('info', message, { obj })
  }

  async error(message: string, obj: any) {
    this.logger.log('error', message, { obj })
  }

  async debug(message: string, obj: any) {
    this.logger.log('debug', message, { obj })
  }
}
