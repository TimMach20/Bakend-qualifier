import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CustomError } from '../errors/CustomError.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const AUTH_ERRORS = JSON.parse(
  readFileSync(path.join(__dirname, './errors/AuthErrors.json'), 'utf8')
)

/**
 * Verify if token as created by the server and is saved in database.
 * @param {Object} context - Apollo Context data.
 * @param {String} token - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
 * @return {void} Throw a exception if token not found in database.
 */
async function checkTokenExits(context, token) {
  let tokenFind = null
  try {
    tokenFind = await context.prisma.userToken.findUnique({
      where: { token }
    })
  } catch (err) {
    throw new CustomError(AUTH_ERRORS.NotFoundToken, err)
  }

  if (tokenFind === null) {
    throw new CustomError(AUTH_ERRORS.NotFoundToken)
  }
}

export { checkTokenExits }
