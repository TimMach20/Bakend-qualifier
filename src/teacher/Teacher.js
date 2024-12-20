import { prisma } from '../database.js'

/**
 * Logic of field userProfile in Teacher
 *
 * @export
 * @param {Object} parent - Data of Teacher.
 * @param {Object} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {Object} Return a object of UserProfile
 */
export async function userProfile(parent, args, context) {
  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        id: parent.userProfileId
      }
    })
    return userProfile
  } catch (err) {
    return null
  }
}

/**
 * Logic of field matters in Teacher
 *
 * @export
 * @param {Object} parent - Data of Teacher.
 * @param {Object} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {Object} Return a object of AcademicMatters
 */
export async function matters(parent, args, context) {
  try {
    const matters = await prisma.academicMatter.findMany({
      where: {
        teacherId: parent.id
      }
    })
    return matters
  } catch (err) {
    return null
  }
}
