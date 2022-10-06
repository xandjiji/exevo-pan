import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  /* const result = await prisma.characterObject.create({
    data: {
      id: 1234,
      tags: {
        connectOrCreate: [
          { create: { name: 'manyQuests' }, where: { name: 'manyQuests' } },
          { create: { name: 'manyBonus' }, where: { name: 'manyBonus' } },
        ],
      },
    },
  }) */

  const [result] = await prisma.characterObject.findMany({
    include: {
      tags: true,
    },
  })
  console.log(result.tags)
}

main()
