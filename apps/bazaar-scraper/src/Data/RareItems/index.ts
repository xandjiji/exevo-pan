import fs from 'fs/promises'
import { broadcast, coloredText, coloredDiff } from 'logging'
import { file } from 'Constants'

const FILE_PATH = file.RARE_ITEM_DATA.path
const FILE_NAME = coloredText(file.RARE_ITEM_DATA.name, 'highlight')

export default class RareItemsData {
  private itemData: RareItemData = {}

  async load(): Promise<void> {
    broadcast(`Loading ${FILE_NAME}...`, 'system')

    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8')
      this.itemData = JSON.parse(data)
    } catch {
      broadcast(
        `Failed to load ${FILE_NAME}, initializing a new one...`,
        'fail',
      )

      await fs.writeFile(FILE_PATH, JSON.stringify(this.itemData))
    }
  }

  private async save(): Promise<void> {
    const rareItemData: RareItemData = {}

    Object.keys(this.itemData).forEach((itemName) => {
      const ids = this.itemData[itemName]
      if (ids.length > 0) {
        rareItemData[itemName] = ids
      }
    })

    await fs.writeFile(FILE_PATH, JSON.stringify(rareItemData))
  }

  async saveItemCollection(collection: RareItemBlockCollection): Promise<void> {
    const rareItemData: RareItemData = {}
    Object.values(collection).forEach(({ name, ids }) => {
      rareItemData[name] = ids
    })

    this.itemData = rareItemData

    await this.save()
    broadcast(`Fresh rare item data was saved to ${FILE_NAME}`, 'success')
  }

  async filterStaleItems(
    currentAuctions: PartialCharacterObject[],
  ): Promise<void> {
    const filteredData: RareItemData = {}

    let staleCount = 0
    Object.keys(this.itemData).forEach((itemName) => {
      const currentTimestamp = +new Date() / 1000
      filteredData[itemName] = this.itemData[itemName].filter((auctionId) => {
        const foundAuction = currentAuctions.find(({ id }) => auctionId === id)

        if (!foundAuction) {
          staleCount += 1
          return false
        }

        const isStale = foundAuction.auctionEnd < currentTimestamp
        if (isStale) staleCount += 1

        return !isStale
      })
    })

    this.itemData = filteredData
    await this.save()
    broadcast(
      `Stale rare item auctions (${coloredDiff(
        -staleCount,
      )} entries) were removed from ${FILE_NAME}`,
      'success',
    )
  }
}
