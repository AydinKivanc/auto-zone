import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  // ...BURAYA Prisma Client querie leri yazilir
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
