import { prisma } from '../database.js'

/**
 * Logic of field user in UserProfile
 *
 * @export
 * @param {Object} parent - Data of UserProfile.
 * @param {Object} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {Object} Return a object of User
 */
export async function user(parent, args, context) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parent.userId
      }
    })
    return user
  } catch (err) {
    return null
  }
}

/**
 * Logic of field photo in UserProfile
 *
 * @export
 * @param {*} parent - Data of UserProfile.
 * @param {*} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {*} Return a string of photo
 */
export async function photo(parent, args, context) {
  if (!parent.photo) {
    return 'https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg'
  }
  return parent.photo
}

/**
 * Logic of field teacher in UserProfile
 *
 * @export
 * @param {*} parent - Data of UserProfile.
 * @param {*} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {*} Return a object of photo
 */
export async function teacher(parent, args, context) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        userProfileId: parent.id
      }
    })
    return teacher
  } catch (err) {
    return null
  }
}
