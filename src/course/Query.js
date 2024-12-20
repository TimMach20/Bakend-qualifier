import { prisma } from "../database"

import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'

import { CustomError } from '../errors/CustomError.js'

