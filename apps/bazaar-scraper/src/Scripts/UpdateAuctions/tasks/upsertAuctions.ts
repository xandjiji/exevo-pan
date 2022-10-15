import { AuctionPage } from 'Helpers'
import { prisma, HttpClient } from 'services'
import { broadcast, tabBroadcast, TrackETA, coloredText } from 'logging'
import { retryWrapper, batchPromises } from 'utils'

type UpsertResult = { updated: number[]; created: number[] }

const AUCTION_PAGE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details'

const fetchAuctionPage = retryWrapper((auctionId: number) =>
  HttpClient.getHtml(`${AUCTION_PAGE_URL}&auctionid=${auctionId}`),
)

export const upsertAuctions = async (
  auctionBlocks: AuctionBlock[],
): Promise<UpsertResult> => {
  const taskTracking = new TrackETA(
    auctionBlocks.length,
    coloredText('Upserting auctions', 'highlight'),
  )

  const serverData = await prisma.server.findMany()
  const helper = new AuctionPage(serverData)

  const auctions: UpsertResult = {
    updated: [],
    created: [],
  }

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

        auctions.updated.push(id)
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

        auctions.created.push(id)
      }

      taskTracking.incTask()
    })
    .map(retryWrapper)

  await batchPromises(tasks)
  taskTracking.finish()

  return auctions
}
