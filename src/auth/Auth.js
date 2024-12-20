import * as authConfig from '../config/properties.js'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { checkTokenExits } from './Authorization.js'
import { CustomError } from '../errors/CustomError.js'
import ms from 'ms'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const AUTH_ERRORS = JSON.parse(
  readFileSync(path.join(__dirname, './errors/AuthErrors.json'), 'utf8')
)

/**
 * Get the payload from a JWT Token.
 * @param {String} token - A user JWT Token used in login.
 * @return {ReturnValueDataTypeHere} Return the jwt payload usually it contains the user id.
 */
function getTokenPayload(token) {
  return jwt.verify(token, authConfig.SECRET)
}

/**
 * Get UserId From Requests Headers.
 * @param {Object} context - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
 * @return {String} return the userId.
 */
async function getUserId(context) {
  if (!context.req.headers.authorization) {
    throw new CustomError(AUTH_ERRORS.TokenAuthorizationHeaderNotFound)
  }

  const authHeader = context.req.headers.authorization
  const token = authHeader.replace('Bearer ', '')

  try {
    await checkTokenExits(context, token)
  } catch (err) {
    throw new CustomError(AUTH_ERRORS.NotFoundToken, err)
  }

  let userId = null

  try {
    userId = getTokenPayload(token)
  } catch (err) {
    throw new CustomError(AUTH_ERRORS.InvalidToken, err)
  }

  return userId
}

/**
 * Create a JWT Token and Save it in database for check if a authorized token.
 * @param {String} userId - User Id.
 * @param {String} role - push notification.
 * @param {Object} context - Apollo Context Data.
 * @return {String} Return a JWT token.
 */
async function createAccessToken(userId, role, context) {
  const token = jwt.sign({ userId, role }, authConfig.SECRET, {
    expiresIn: authConfig.EXPIRES
  })

  // Set time to revoke token
  const dateExpire = new Date()
  const timeInMilliSeconds =
    typeof authConfig.EXPIRES === 'number' ? authConfig.EXPIRES : ms(authConfig.EXPIRES)
  if (isNaN(timeInMilliSeconds)) {
    throw new CustomError(AUTH_ERRORS.NotFound)
  }

  dateExpire.setTime(dateExpire.getTime() + timeInMilliSeconds)

  await context.prisma.userToken.create({
    data: {
      userId,
      token,
      revoked: dateExpire
    }
  })

  return token
}

export { createAccessToken, getUserId }
