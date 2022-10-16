import { dequal } from 'dequal'
import { AuctionPage } from 'Helpers'
import { prisma, HttpClient } from 'services'
import { broadcast, TrackETA, coloredText } from 'logging'
import { retryWrapper, batchPromises } from 'utils'

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
): Promise<{
  updatedIds: number[]
  createdIds: number[]
}> => {
  const serverData = await prisma.server.findMany()
  const helper = new AuctionPage(serverData)

  broadcast('Diffing stored and fresh data...', 'control')
  const storedAuctionBlockMap = await getDbAuctionBlocks()

  const newAuctionBlocks = auctionBlocks.filter(
    (freshAuctionBlock) => !storedAuctionBlockMap.get(freshAuctionBlock.id),
  )
  const biddedAuctionBlocks = auctionBlocks.filter(
    ({ id, ...freshBlockData }) => {
      const storedBlockData = storedAuctionBlockMap.get(id)
      return storedBlockData && !dequal(freshBlockData, storedBlockData)
    },
  )

  const taskTracking = new TrackETA(
    newAuctionBlocks.length + biddedAuctionBlocks.length,
    coloredText('Upserting auctions', 'highlight'),
  )

  const tasks = {
    updateAuctions: biddedAuctionBlocks
      .map(({ id, hasBeenBidded, currentBid }) => async () => {
        taskTracking.incTask()

        await prisma.currentAuction.update({
          where: { id },
          data: {
            hasBeenBidded,
            currentBid,
          },
        })

        broadcast(
          `Auction updated (${coloredText(
            id,
            'highlight',
          )}) ${taskTracking.getProgress()}`,
          'neutral',
        )
      })
      .map(retryWrapper),
    scrapNewAuctions: newAuctionBlocks
      .map(({ id }) => async () => {
        taskTracking.incTask()

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

        broadcast(
          `New auction scraped (${coloredText(
            id,
            'highlight',
          )}) ${taskTracking.getProgress()}`,
          'neutral',
        )
      })
      .map(retryWrapper),
  }

  await Promise.all([
    batchPromises(tasks.updateAuctions),
    batchPromises(tasks.scrapNewAuctions),
  ])
  taskTracking.finish()

  return {
    updatedIds: biddedAuctionBlocks.map(({ id }) => id),
    createdIds: newAuctionBlocks.map(({ id }) => id),
  }
}
