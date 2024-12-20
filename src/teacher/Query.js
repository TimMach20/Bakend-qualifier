import { prisma } from '../database.js'

import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'

import { CustomError } from '../errors/CustomError.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TEACHERS_ERROR = JSON.parse(
  readFileSync(path.join(__dirname, './errors/TeacherErrors.json'), 'utf8')
)

const TEACHERS_SUCCESS = JSON.parse(
  readFileSync(path.join(__dirname, './success/TeacherSuccess.json'), 'utf8')
)

/**
 *  Get Teachers
 *
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Object} Return Country created.
 */
async function getTeachers(parent, args, context, info) {
  try {
    const teachers = await prisma.teacher.findMany()
    return {
      data: teachers,
      msg: TEACHERS_SUCCESS.TeachersReady
    }
  } catch (err) {
    throw new CustomError(TEACHERS_ERROR.Error, err)
  }
}

export { getTeachers }
