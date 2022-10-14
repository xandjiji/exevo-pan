import { AuctionPage } from 'Helpers'
import { prisma, HttpClient } from 'services'
import { broadcast, tabBroadcast, TrackETA, coloredText } from 'logging'
import { retryWrapper, batchPromises } from 'utils'

const AUCTION_PAGE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details'

const fetchAuctionPage = retryWrapper((auctionId: number) =>
  HttpClient.getHtml(`${AUCTION_PAGE_URL}&auctionid=${auctionId}`),
)

export const upsertAuctions = async (
  auctionBlocks: AuctionBlock[],
): Promise<void> => {
  const taskTracking = new TrackETA(
    auctionBlocks.length,
    coloredText('Upserting auctions', 'highlight'),
  )

  const serverData = await prisma.server.findMany()
  const helper = new AuctionPage(serverData)

  const tasks = auctionBlocks
    .map(({ id, hasBeenBidded, currentBid }) => async () => {
      broadcast(
        `Upserting auction id: ${coloredText(
          id,
          'highlight',
        )} ${taskTracking.getProgress()}`,
        'neutral',
      )

      try {
        await prisma.currentAuction.update({
          where: { id },
          data: {
            hasBeenBidded,
            currentBid,
          },
        })
      } catch {
        tabBroadcast(`New auction found! Scraping data...`, 'neutral')

        const newAuctionHtml = await fetchAuctionPage(id)
        const { serverName, server, ...characterData } =
          await helper.characterObject(newAuctionHtml)

        await prisma.currentAuction.create({
          data: {
            ...characterData,
            server: {
              connectOrCreate: {
                where: { serverName },
                create: server,
              },
            },
          },
        })
      }

      taskTracking.incTask()
    })
    .map(retryWrapper)

  await batchPromises(tasks)
  taskTracking.finish()
}
