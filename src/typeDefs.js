import { fileURLToPath } from 'url'
import * as fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const typeDefs = [
  fs.readFileSync(path.join(__dirname, './countries/schema.graphql'), 'utf8'),
  fs.readFileSync(path.join(__dirname, './user/schema.graphql'), 'utf8'),
  fs.readFileSync(path.join(__dirname, './teacher/schema.graphql'), 'utf8'),
  fs.readFileSync(path.join(__dirname, './student/schema.graphql'), 'utf8'),
  fs.readFileSync(path.join(__dirname, './course/schema.graphql'), 'utf8')
]

export { typeDefs }
