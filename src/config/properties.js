import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
export const ENVIRONMENT = process.env.ENVIRONMENT || 'DEVELOPMENT'
export const SECRET = process.env.AUTH_SECRET || 'auth_secret'
export const EXPIRES = process.env.AUTH_EXPIRES || '1d'
