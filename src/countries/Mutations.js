import { prisma } from '../database.js'

import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'

import { CustomError } from '../errors/CustomError.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COUNTRIES_ERROR = JSON.parse(
  readFileSync(path.join(__dirname, './errors/CountriesErrors.json'), 'utf8')
)

const COUNTRIES_SUCCESS = JSON.parse(
  readFileSync(path.join(__dirname, './success/CountriesSuccess.json'), 'utf8')
)

/**
 * Create a Country.
 *
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {String} args.name - Name of country.
 * @param {String} args.code - Code of country.
 * @param {String} args.url - Url of country.
 * @param {String} args.image - image of country.
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Object} Return Country created.
 */
async function addCountry(parent, args, context, info) {
  const requiredFields = ['name', 'code']
  for (const field of requiredFields) {
    if (!args[field]) {
      throw new CustomError(COUNTRIES_ERROR.ArgumentsAreMissing, field)
    }
  }

  const { name, code, url, image } = args

  try {
    const country = await prisma.country.create({
      data: {
        name,
        code,
        url,
        image
      }
    })

    return {
      data: country,
      msg: COUNTRIES_SUCCESS.CreatedCountry
    }
  } catch (err) {
    throw new CustomError(err)
  }
}
/**
 * Update Country
 *
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - Graphql arguments.
 * @param {String} args.id - Id of country.
 * @param {String} args.name - New name of country.
 * @param {String} args.code - New code of country.
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Object} Return Country updated.
 */
async function updateCountry(parent, args, context, info) {
  const requiredFields = ['id', 'name', 'code']
  for (const field of requiredFields) {
    if (!args[field]) {
      throw new CustomError(COUNTRIES_ERROR.ArgumentsAreMissing, field)
    }
  }

  const { id, name, code, url, image } = args

  try {
    const country = await prisma.country.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        code,
        url,
        image
      }
    })

    return country
  } catch (err) {
    throw new CustomError(err)
  }
}

/**
 * Delete Country
 *
 * @param {Object} parent - Graphql parent objet data.
 * @param {Object} args - Graphql arguments.
 * @param {String} args.id - Id of Country.
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Data.
 * @return {Object} Return Country deleted.
 */
async function deleteCountry(parent, args, context, info) {
  const requiredFields = ['id']
  for (const field of requiredFields) {
    if (!args[field]) {
      throw new CustomError(COUNTRIES_ERROR.ArgumentsAreMissing, field)
    }
  }

  const { id } = args

  try {
    const country = await prisma.country.delete({
      where: {
        id: parseInt(id)
      }
    })

    return {
      data: country,
      msg: COUNTRIES_SUCCESS.DeleteFound
    }
  } catch (err) {
    throw new CustomError(err)
  }
}

export { addCountry, updateCountry, deleteCountry }
