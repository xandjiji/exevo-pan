import { endpoints, paths } from 'Constants'
import {
  buildServerOptions,
  filterItemData,
  buildRareItemsOptions,
} from './utils'

export default class DrawerFieldsClient {
  static serverDataUrl = `${endpoints.STATIC_DATA}${paths.SERVER_DATA}`

  static rareItemDataUrl = `${endpoints.STATIC_DATA}${paths.ITEMS_DATA}`

  static async fetchServerOptions(): Promise<Option[]> {
    const response = await fetch(this.serverDataUrl)
    const data = (await response.json()) as Record<string, ServerObject>
    const serverArray = Object.values(data)
    const serverOptions = buildServerOptions(serverArray)

    return serverOptions
  }

  static async fetchAuctionedItemOptions(): Promise<Option[]> {
    const response = await fetch(this.rareItemDataUrl)
    const data = (await response.json()) as RareItemData
    const rareItemData = filterItemData(data)
    const auctionedItemOptions = buildRareItemsOptions(rareItemData)

    return auctionedItemOptions
  }
}
