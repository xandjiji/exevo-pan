import { HttpClient, prisma } from 'services'
import { retryWrapper } from 'utils'

export const DELAY = 10000

const AUCTION_PAGE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details'

export const fetchAuctionPage = retryWrapper(async (auctionId: number) =>
  HttpClient.getHtml(`${AUCTION_PAGE_URL}&auctionid=${auctionId}`),
)

export const db = {
  getServers: retryWrapper(prisma.server.findMany),
  getScrapHistoryData: retryWrapper(async () => {
    const { lastScrapedId } =
      (await prisma.lastHistoryScrapedId.findFirst()) ?? {
        id: '',
        lastScrapedId: 0,
      }

    const currentTimestamp = Math.floor(+new Date() / 1000)

    const maturedAuctions = await prisma.unfinishedAuction.findMany({
      where: { auctionEnd: { lte: currentTimestamp } },
    })

    return { lastScrapedId, maturedAuctions }
  }),
  insertUnfinishedAuction: retryWrapper(
    (unfinishedAuction: UnfinishedAuction) =>
      prisma.$transaction([
        prisma.unfinishedAuction.create({ data: unfinishedAuction }),
        prisma.lastHistoryScrapedId.deleteMany(),
        prisma.lastHistoryScrapedId.create({
          data: { lastScrapedId: unfinishedAuction.id },
        }),
      ]),
  ),
  insertFreshHistoryAuction: retryWrapper(async (auction: CharacterObject) => {
    const { id, serverName, server, ...characterData } = auction

    const rareItems = await prisma.rareItem.findMany({
      where: { currentAuctionId: id },
      select: { id: true, name: true },
    })

    await prisma.$transaction([
      prisma.historyAuction.create({
        data: {
          ...characterData,
          id,
          rareItems,
          server: { connect: { serverName } },
        },
      }),
      prisma.lastHistoryScrapedId.deleteMany(),
      prisma.lastHistoryScrapedId.create({ data: { lastScrapedId: id } }),
    ])
  }),
  insertMaturedHistoryAuction: retryWrapper(
    async (auction: CharacterObject) => {
      const { id, serverName, server, ...characterData } = auction

      const rareItems = await prisma.rareItem.findMany({
        where: { currentAuctionId: id },
        select: { id: true, name: true },
      })

      await prisma.$transaction([
        prisma.historyAuction.create({
          data: {
            ...characterData,
            id,
            rareItems,
            server: { connect: { serverName } },
          },
        }),
        prisma.unfinishedAuction.delete({ where: { id } }),
      ])
    },
  ),
}
