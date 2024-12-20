import { prisma } from '../database.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import { CustomError } from '../errors/CustomError.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const STUDENT_ERROR = JSON.parse(
  readFileSync(path.join(__dirname, './errors/StudentErrors'), 'utf8')
)

const STUDENT_SUCCESS = JSON.parse(
  readFileSync(path.join(__dirname, './success/SudentSuccess.json'), 'utf8')
)

/**
 * Get all Student.
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Array} Return a List of Student States.
 */
async function getStudent(parent, args, context, info) { 

  try {
    const student = await prisma.student.findMany()
    return {
      data: student,
      msg: "La lista de estudiantes a cargado correctamente"
    }
  } catch (err) {
    throw new CustomError(STUDENT_ERROR.StudentNotFound, err)
  }
}

export { getTeachers }