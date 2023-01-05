import { endpoints, paths } from 'Constants'
import { buildServerOptions, filterItemData } from './utils'

export default class DrawerFieldsClient {
  private static activeServersUrl = `${endpoints.STATIC_DATA}${paths.ACTIVE_SERVERS}`

  private static serverDataUrl = `${endpoints.STATIC_DATA}${paths.SERVER_DATA}`

  private static rareItemDataUrl = `${endpoints.STATIC_DATA}${paths.ITEMS_DATA}`

  static async fetchServerData(): Promise<Record<string, ServerObject>> {
    const response = await fetch(this.serverDataUrl)
    const serverData: Record<string, ServerObject> = await response.json()

    return serverData
  }

  static async fetchActiveServerOptions(): Promise<Option[]> {
    const response = await fetch(this.activeServersUrl)

    const activeServers: string[] = await response.json()
    return activeServers.map((server) => ({ name: server, value: server }))
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
