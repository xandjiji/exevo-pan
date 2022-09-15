import { endpoints, paths } from 'Constants'
import { buildServerOptions, filterItemData } from './utils'

export default class DrawerFieldsClient {
  static activeServersUrl = `${endpoints.STATIC_DATA}${paths.ACTIVE_SERVERS}`

  static serverDataUrl = `${endpoints.STATIC_DATA}${paths.SERVER_DATA}`

  static rareItemDataUrl = `${endpoints.STATIC_DATA}${paths.ITEMS_DATA}`

  static async fetchActiveServers(): Promise<string[]> {
    const response = await fetch(this.activeServersUrl)

    return response.json()
  }

  static async fetchServerOptions(): Promise<Option[]> {
    const response = await fetch(this.serverDataUrl)
    const data: Record<string, ServerObject> = await response.json()
    const serverArray = Object.values(data)
    const serverOptions = buildServerOptions(serverArray)

    return serverOptions
  }

  static async fetchAuctionedItemOptions(): Promise<RareItemData> {
    const response = await fetch(this.rareItemDataUrl)
    const data: RareItemData = await response.json()
    return filterItemData(data)
  }
}
