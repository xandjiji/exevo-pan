import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  /* const result = await prisma.characterObject.create({
    data: {
      id: 456,
      serverData: {
        connectOrCreate: {
          where: { serverName: 'Dolera' },
          create: {
            serverName: 'Dolera',
            active: true,
            battleye: true,
            experimental: false,
            PvpType: 'Hardcore PvP',
            serverLocation: 'NA',
          },
        },
      },
      tags: {
        connectOrCreate: [
          { create: { name: 'manyQuests' }, where: { name: 'manyQuests' } },
          { create: { name: 'manyBonus' }, where: { name: 'manyBonus' } },
        ],
      },
    },
  }) */

  const result = await prisma.characterObject.findMany({
    where: {
      serverData: {
        serverName: {
          contains: 'dole',
        },
      },
    },
    include: {
      serverData: true,
      tags: true,
    },
  })
  result.forEach((item) => console.log(item))
  /* console.log(result) */
}

main()
