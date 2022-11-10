import { endpoints, paths } from 'Constants'

export default class BossesClient {
  private static bossChancesUrl = `${endpoints.STATIC_DATA}${paths.BOSS_CHANCES}`

  static async fetchServerBossChances(
    serverName: string,
  ): Promise<BossChances> {
    const response = await fetch(`${this.bossChancesUrl}/${serverName}.json`)

    return response.json()
  }
}
