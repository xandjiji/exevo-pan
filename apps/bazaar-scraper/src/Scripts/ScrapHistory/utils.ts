import { HttpClient, prisma } from 'services'
import { retryWrapper } from 'utils'

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
  insertHistoryAuction: retryWrapper(
    async (auction: CharacterObject, isMaturedAuction: boolean) => {
      const { id, serverName, server, ...characterData } = auction

      const rareItems = await prisma.rareItem.findMany({
        where: { currentAuctionId: id },
        select: { id: true, name: true },
      })

      const auctionData = {
        data: {
          ...characterData,
          id,
          rareItems,
          server: { connect: { serverName } },
        },
      }

      if (isMaturedAuction) {
        await prisma.$transaction([
          prisma.historyAuction.create(auctionData),
          prisma.unfinishedAuction.delete({ where: { id } }),
          prisma.lastHistoryScrapedId.deleteMany(),
          prisma.lastHistoryScrapedId.create({ data: { lastScrapedId: id } }),
        ])
      } else {
        await prisma.$transaction([
          prisma.historyAuction.create(auctionData),
          prisma.lastHistoryScrapedId.deleteMany(),
          prisma.lastHistoryScrapedId.create({ data: { lastScrapedId: id } }),
        ])
      }
    },
  ),
}
