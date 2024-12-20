import { prisma } from '../database.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import { CustomError } from '../errors/CustomError.js'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USER_ERROR = JSON.parse(
  readFileSync(path.join(__dirname, './errors/UserErrors.json'), 'utf8')
)

const USER_SUCCESS = JSON.parse(
  readFileSync(path.join(__dirname, './success/UserSuccess.json'), 'utf8')
)

/**
 * Register of theachers
 *
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {String} args.name - Name of teacher.
 * @param {String} args.lastname - Lastname of teacher.
 * @param {String} args.password - password of teacher.
 * @param {String} args.description - description of teacher.
 * @param {String} args.photo - photo profile of teacher
 * @param {String} args.dni - DNI of teacher
 * @param {Array} args.matters - matters of teacher
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Object} Return Country created.
 */
export async function registerTeacher(parent, args, context, info) {
  const requiredFields = ['name', 'lastname', 'password', 'dni']
  for (const field of requiredFields) {
    if (!args[field]) {
      throw new CustomError(USER_ERROR.ArgumentsAreMissing, field)
    }
  }

  const { name, lastname, password, description, photo, dni, matters } = args
  const hashPassword = await bcrypt.hash(password, 10)
  const mattersData = matters.map((matterString) => ({
    matter: matterString
  }))

  const userExist = await prisma.user.findUnique({
    where: {
      dni
    }
  })

  if (userExist) {
    throw new CustomError(USER_ERROR.DniExist)
  }

  try {
    const teacher = await prisma.user.create({
      data: {
        dni,
        password: hashPassword,
        role: 'TEACHER',
        userProfile: {
          create: {
            name,
            lastname,
            description,
            photo,
            teacher: {
              create: {
                matters: {
                  create: mattersData
                }
              }
            }
          }
        }
      }
    })
    return {
      data: teacher,
      msg: USER_SUCCESS.CreatedTeacher
    }
  } catch (error) {
    throw new CustomError(error)
  }
}

/**
 * Register of Student
 *
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {String} args.name - Name of student.
 * @param {String} args.lastname - Lastname of student.
 * @param {String} args.password - password of student.
 * @param {String} args.description - description of student.
 * @param {String} args.photo - photo profile of student
 * @param {String} args.dni - DNI of student
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Object} Return User created.
 */
export async function registerStudent(parent, args, context, info) {
  const requiredFields = ['name', 'lastname', 'password', 'dni']
  for (const field of requiredFields) {
    if (!args[field]) {
      throw new CustomError(USER_ERROR.ArgumentsAreMissing, field)
    }
  }

  const { name, lastname, password, description, photo, dni } = args
  const hashPassword = await bcrypt.hash(password, 10)

  const userExist = await prisma.user.findUnique({
    where: {
      dni
    }
  })

  if (userExist) {
    throw new CustomError(USER_ERROR.DniExist)
  }

  try {
    const student = await prisma.user.create({
      data: {
        dni,
        password: hashPassword,
        role: 'STUDENT',
        userProfile: {
          create: {
            name,
            lastname,
            description,
            photo,
            student: {
              create: {}
            }
          }
        }
      },
    })
    return {
      data: student,
      msg: USER_SUCCESS.CreatedStudent
    }
  } catch (error) {
    throw new CustomError(error)
  }
}
