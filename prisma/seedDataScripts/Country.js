import { PrismaClient } from '@prisma/client'
import { readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const prisma = new PrismaClient()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const seedDataPath = path.join(__dirname, "data_seed")


export async function seedCountry() {
  let country = JSON.parse(
    readFileSync(`${seedDataPath}/Country.json`, "utf8")
  )

  await prisma.country.createMany({
    data: country,
    skipDuplicates: true
  })

  country = null
  await prisma.$disconnect()
  console.log("✅ Finished seed Country...")
}