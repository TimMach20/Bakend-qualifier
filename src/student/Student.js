import { prisma } from '../database.js'

/**
 * Logic of field userProfile in Student
 *
 * @export
 * @param {Object} parent - Data of Student.
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
