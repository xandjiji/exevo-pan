import { prisma } from '../../prisma'

export default class BossesClient {
  static async fetchServerBossChances(server: string): Promise<BossChances> {
    const response = await prisma.bossChance.findFirst({ where: { server } })

    if (!response) throw Error(`Boss chance data not found for [${server}]`)

    return JSON.parse(response.jsonData)
  }
}
