import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const device = await prisma.device.create({
    data: {
      device_name : 'Device A'
    },
  })
  console.log(device)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })