import { dequal } from 'dequal'
import { AuctionPage } from 'Helpers'
import { prisma, HttpClient } from 'services'
import { broadcast, TrackETA, coloredText } from 'logging'
import { retryWrapper, batchPromises } from 'utils'

type UpsertResult = { updated: number[]; created: number[] }

const AUCTION_PAGE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details'

const fetchAuctionPage = retryWrapper((auctionId: number) =>
  HttpClient.getHtml(`${AUCTION_PAGE_URL}&auctionid=${auctionId}`),
)

const getDbAuctionBlocks = retryWrapper(async () => {
  const auctionBlocks = await prisma.currentAuction.findMany({
    select: {
      id: true,
      hasBeenBidded: true,
      currentBid: true,
    },
  })

  const auctionBlockMap = new Map<
    AuctionBlock['id'],
    Pick<AuctionBlock, 'currentBid' | 'hasBeenBidded'>
  >()
  auctionBlocks.forEach(({ id, ...blockData }) =>
    auctionBlockMap.set(id, blockData),
  )

  return auctionBlockMap
})

export const upsertAuctions = async (
  auctionBlocks: AuctionBlock[],
): Promise<UpsertResult> => {
  const serverData = await prisma.server.findMany()
  const helper = new AuctionPage(serverData)

  const auctions: UpsertResult = {
    updated: [],
    created: [],
  }

  broadcast('Diffing stored and fresh data...', 'control')
  const storedAuctionBlockMap = await getDbAuctionBlocks()
  const differentAuctionBlocks = auctionBlocks.filter(
    ({ id, ...freshBlockData }) => {
      const storedBlockData = storedAuctionBlockMap.get(id)

      if (!storedBlockData) return true

      return !dequal(freshBlockData, storedBlockData)
    },
  )

  const taskTracking = new TrackETA(
    differentAuctionBlocks.length,
    coloredText('Upserting auctions', 'highlight'),
  )

  const tasks = differentAuctionBlocks
    .map(({ id, hasBeenBidded, currentBid }) => async () => {
      taskTracking.incTask()

      try {
        await prisma.currentAuction.update({
          where: { id },
          data: {
            hasBeenBidded,
            currentBid,
          },
        })

        auctions.updated.push(id)

        broadcast(
          `Auction updated (${coloredText(
            id,
            'highlight',
          )}) ${taskTracking.getProgress()}`,
          'neutral',
        )
      } catch {
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

        broadcast(
          `New auction scraped (${coloredText(
            id,
            'highlight',
          )}) ${taskTracking.getProgress()}`,
          'neutral',
        )
      }
    })
    .map(retryWrapper)

  await batchPromises(tasks)
  taskTracking.finish()

  return auctions
}
