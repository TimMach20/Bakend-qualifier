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
 * Get all countries.
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {String} args.countryId - Id of country   // example
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Array} Return a List of Country's States.
 */
async function getCountries(parent, args, context, info) {
  let countries = null

  try {
    countries = await prisma.country.findMany()
  } catch (err) {
    throw new CustomError(COUNTRIES_ERROR.CountriesNotFound, err)
  }

  if (countries === null) {
    throw new CustomError(
      COUNTRIES_ERROR.CountriesNotFound,
      'Error: Cannot return null for non-nullable field Query.getCountries'
    )
  }

  return {
    data: countries,
    msg: COUNTRIES_SUCCESS.CountriesFound
  }
}

/**
 * Get all countries.
 * @param {Object} parent - Graphql parent object data.
 * @param {Object} args - GraphQL arguments.
 * @param {String} args.id - Id of country.
 * @param {Object} context - Apollo Context Data.
 * @param {Object} info - Graphql Info Data.
 * @return {Array} Return a List of Country's States.
 */
async function getCountryById(parent, args, context, info) {
  const countryId = args.id
  let country = null

  try {
    country = await prisma.country.findUnique({
      where: {
        id: parseInt(countryId)
      }
    })
  } catch (err) {
    throw new CustomError(COUNTRIES_ERROR.CountriesNotFound, err)
  }

  if (country === null) {
    throw new CustomError(
      COUNTRIES_ERROR.CountriesNotFound,
      'Error: Cannot return null for non-nullable field Query.getCountries'
    )
  }

  return {
    data: country,
    msg: COUNTRIES_SUCCESS.CountriesFound
  }
}

export { getCountries, getCountryById }
