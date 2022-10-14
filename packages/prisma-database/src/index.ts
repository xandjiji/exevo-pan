import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const t0 = +new Date()
  /* const result = await prisma.historyAuction.count({
    where: {
      charms: { hasEvery: ['Dodge', 'Freeze'] },
      bossPoints: { gte: 0, lte: 1050 },
      AND: [
        {
          outfits: {
            some: {
              name: 'Mage',
              type: 1,
            },
          },
        },
        {
          outfits: {
            some: {
              name: 'Hand of the Inquisition',
              type: 3,
            },
          },
        },
      ],
    },
    orderBy: {
      auctionEnd: 'desc',
    },
    skip: 4320,
    take: 10,
  }) */

  const result = await prisma.server.findMany({
    where: { active: false },
  })
  const t1 = +new Date()

  console.log(result)
  console.log(`took: ${t1 - t0}ms`)
}

main()
