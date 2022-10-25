import { prisma } from '../prisma'

export class DrawerFieldsClient {
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

  static async fetchAuctionedItemOptions(): Promise<Option[]> {
    const result = await prisma.currentRareItems.findMany()
    return result.map(({ name }) => ({ name, value: name }))
  }
}
