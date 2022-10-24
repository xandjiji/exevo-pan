import { endpoints, paths } from 'Constants'
import { filterItemData } from './utils'
import { prisma } from '../prisma'

export default class DrawerFieldsClient {
  private static rareItemDataUrl = `${endpoints.STATIC_DATA}${paths.ITEMS_DATA}`

  static async fetchServerOptions(args?: {
    active?: boolean
  }): Promise<Option[]> {
    const result = await prisma.server.findMany({
      where: { active: args?.active },
      select: { serverName: true },
      orderBy: { serverName: 'asc' },
    })

    return result.map(({ serverName }) => ({
      name: serverName,
      value: serverName,
    }))
  }

  static async fetchAuctionedItemOptions(): Promise<RareItemData> {
    const response = await fetch(this.rareItemDataUrl)
    const data: RareItemData = await response.json()
    return filterItemData(data)
  }
}
