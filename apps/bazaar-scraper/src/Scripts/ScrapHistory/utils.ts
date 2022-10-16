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

    const currentTimestamp = +new Date() / 1000

    const maturedAuctions = await prisma.unfinishedAuction.findMany({
      where: { auctionEnd: { lte: currentTimestamp } },
    })

    return { lastScrapedId, maturedAuctions }
  }),
  insertUnfinishedAuction: retryWrapper(prisma.unfinishedAuction.create),
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
        ])
      } else {
        await prisma.historyAuction.create(auctionData)
      }
    },
  ),
}
