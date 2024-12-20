import { PrismaClient } from "@prisma/client"
import { seedCountry } from "./seedDataScripts/Country.js"

const prisma = new PrismaClient()

async function main() {
  await seedCountry()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log("✅ All data seeding done")
    await prisma.$disconnect()
  })
