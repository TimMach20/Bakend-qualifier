import { prisma } from '../database.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import { CustomError } from '../errors/CustomError.js'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TEACHERS_ERROR = JSON.parse(
  readFileSync(path.join(__dirname, './errors/TeacherErrors.json'), 'utf8')
)

const TEACHERS_SUCCESS = JSON.parse(
  readFileSync(path.join(__dirname, './success/TeacherSuccess.json'), 'utf8')
)

