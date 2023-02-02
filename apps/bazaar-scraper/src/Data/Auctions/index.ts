import fs from 'fs/promises'
import { broadcast, coloredText, coloredDiff } from 'logging'
import { file } from 'Constants'

const FILE_PATH = file.CURRENT_AUCTIONS.path
const FILE_NAME = coloredText(file.CURRENT_AUCTIONS.name, 'highlight')

export default class CurrentAuctionsData {
  private currentAuctions: PartialCharacterObject[] = []

  async load(): Promise<void> {
    broadcast(`Loading ${FILE_NAME}...`, 'system')

    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8')
      this.currentAuctions = JSON.parse(data)
    } catch {
      broadcast(
        `Failed to load ${FILE_NAME}, initializing a new one...`,
        'fail',
      )

      await fs.writeFile(FILE_PATH, JSON.stringify([]))
    }
  }

  private async save(): Promise<void> {
    /* if (this.currentAuctions.length === 0) {
      broadcast(`WARNING! Writing empty values to ${FILE_NAME}`, 'fail')
      broadcast('exiting gracefully...', 'control')
      process.exit()
    } */

    this.currentAuctions = this.currentAuctions.sort(
      (a, b) => a.auctionEnd - b.auctionEnd,
    )
    const auctionIdSet = new Set<number>([])
    this.currentAuctions = this.currentAuctions.filter(({ id }) => {
      const repeated = auctionIdSet.has(id)
      auctionIdSet.add(id)
      return !repeated
    })

    await fs.writeFile(FILE_PATH, JSON.stringify(this.currentAuctions))
  }

  getAllAuctions(): PartialCharacterObject[] {
    return this.currentAuctions
  }

  async updatePreviousAuctions(
    auctionBlocks: AuctionBlock[],
  ): Promise<BiddedAuctions[]> {
    const auctionBlockIds = new Set(auctionBlocks.map(({ id }) => id))
    let removedCount = 0

    const updatedAuctions: BiddedAuctions[] = []

    const newCurrentAuctions = this.currentAuctions
      .filter(({ id }) => {
        const finished = !auctionBlockIds.has(id)
        if (finished) removedCount += 1
        return !finished
      })
      .map((auction) => {
        const freshAuctionBlock = auctionBlocks.find(
          ({ id }) => id === auction.id,
        )

        if (!freshAuctionBlock) return auction

        const wasUpdated =
          auction.currentBid !== freshAuctionBlock.currentBid ||
          auction.hasBeenBidded !== freshAuctionBlock.hasBeenBidded

        if (wasUpdated) {
          updatedAuctions.push({
            auctionId: freshAuctionBlock.id,
            currentBid: freshAuctionBlock.currentBid,
          })
        }

        return {
          ...auction,
          currentBid: freshAuctionBlock.currentBid,
          hasBeenBidded: freshAuctionBlock.hasBeenBidded,
        }
      })

    if (this.currentAuctions.length > 0 && newCurrentAuctions.length === 0) {
      broadcast(`WARNING! Writing empty values to ${FILE_NAME}`, 'fail')
      broadcast('exiting gracefully...', 'control')
      process.exit()
    }

    this.currentAuctions = newCurrentAuctions

    await this.save()
    broadcast(
      `${FILE_NAME} entries were updated (${coloredDiff(
        -removedCount,
      )} removed and ${coloredDiff(updatedAuctions.length)} updated)`,
      'success',
    )

    return updatedAuctions
  }

  newAuctionIds(auctionBlocks: AuctionBlock[]): number[] {
    const currentAuctionIds = new Set(this.currentAuctions.map(({ id }) => id))

    return auctionBlocks
      .filter(({ id }) => !currentAuctionIds.has(id))
      .map(({ id }) => id)
  }

  async appendAuctions(newAuctions: PartialCharacterObject[]): Promise<void> {
    newAuctions.forEach((auction) => this.currentAuctions.push(auction))

    await this.save()
    broadcast(
      `Fresh auctions (${coloredDiff(
        newAuctions.length,
      )} entries) were saved to ${FILE_NAME}`,
      'success',
    )
  }
}
