import { ENVIRONMENT } from '../config/properties.js'

export class DomainError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class CustomError extends DomainError {
  constructor(message, error) {
    if (ENVIRONMENT !== 'PRODUCTION' && error) {
      message += ` ${error}`
    }
    super(`${message}`)
    this.data = { message, error }
  }
}
