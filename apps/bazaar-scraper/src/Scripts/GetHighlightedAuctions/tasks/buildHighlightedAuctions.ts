import { Auctions, ServerData } from 'Data'
import { broadcast } from 'logging'

const MINIMUM_HIGHLIGHTED = 2

const sortByHighestBids = (
  allAuctions: PartialCharacterObject[],
): PartialCharacterObject[] =>
  allAuctions
    .filter(({ hasBeenBidded }) => hasBeenBidded)
    .sort((a, b) => b.currentBid - a.currentBid)

export const buildHighlightedAuctions = async (
  highlightedIds: number[],
): Promise<CharacterObject[]> => {
  broadcast(`Building character objects...`, 'neutral')

  const auctionData = new Auctions()
  await auctionData.load()
  const serverData = new ServerData()
  await serverData.load()

  const allAuctions = auctionData.getAllAuctions()

  const highlightedIdSet = new Set<number>(highlightedIds)
  const currentTimestamp = +new Date() / 1000

  const partialAuctions: PartialCharacterObject[] = allAuctions
    .filter(({ id }) => highlightedIdSet.has(id))
    .filter(({ auctionEnd }) => auctionEnd > currentTimestamp)

  const sortedByHighestBid: PartialCharacterObject[] =
    sortByHighestBids(allAuctions)

  while (
    partialAuctions.length < MINIMUM_HIGHLIGHTED &&
    sortedByHighestBid.length > 0
  ) {
    partialAuctions.push(sortedByHighestBid.shift()!)
  }

  return partialAuctions.map((auction) => ({
    ...auction,
    serverData: serverData.getServerById(auction.serverId),
  }))
}
