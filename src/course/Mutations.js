import { prisma } from '../database.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import { CustomError } from '../errors/CustomError.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COURSE_ERROR = JSON.parse(
  readFileSync(path.join(__dirname, './errors/CourseErrors.json'), 'utf8')
)

const COURSE_SUCCESS = JSON.parse(
  readFileSync(path.join(__dirname, './success/CourseSuccess.json'), 'utf8')
)

/**
 *  Create a new Course
 *
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {String} args.degree - Degree of Course.
 * @param {String} args.section - Section of Course.
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Object} Return Country created.
 */
export async function createCourse(parent, args, context, info) {
  const requiredFields = ['degree', 'section']
  for (const field of requiredFields) {
    if (!args[field]) {
      throw new CustomError(COURSE_ERROR.ArgumentsAreMissing, field)
    }
  }

  const { degree, section } = args

  try {
    const course = await prisma.course.create({
      data: {
        degree,
        section
      }
    })
    return {
      data: course,
      msg: COURSE_SUCCESS.CreatedCourse
    }
  } catch (err) {
    throw new CustomError(err)
  }
}
