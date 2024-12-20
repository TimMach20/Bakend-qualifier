import { prisma } from '../database.js'

/**
 * Logic of field teacher in AcademicMatters
 *
 * @export
 * @param {Object} parent - Data of AcademicMatters.
 * @param {Object} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {Object} Return a object of Teacher
 */
export async function teacher(parent, args, context) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: parent.teacherId
      }
    })
    return teacher
  } catch (err) {
    return null
  }
}
