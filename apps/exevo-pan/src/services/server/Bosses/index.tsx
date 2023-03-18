import { prisma } from 'lib/prisma'
import { pluckPremiumBossData } from 'utils'
import { endpoints, paths } from 'Constants'

export default class BossesClient {
  private static bossChancesUrl = `${endpoints.STATIC_DATA}${paths.BOSS_CHANCES}`

  static async fetchServerBossChances(
    serverName: string,
  ): Promise<BossChances> {
    const response = await fetch(`${this.bossChancesUrl}/${serverName}.json`)

    return response.json()
  }

  static async fetchCheckedBosses({
    isPro,
    guildId,
    server,
  }: {
    isPro: boolean
    guildId: string
    server: string
  }): Promise<CheckedBoss[]> {
    const [bossChecks, allBossChances] = await Promise.all([
      prisma.bossCheck.findMany({
        where: { guildId },
        include: { checkedBy: { select: { name: true } } },
      }),
      this.fetchServerBossChances(server),
    ])

    const bossChances: typeof allBossChances = isPro
      ? allBossChances
      : pluckPremiumBossData(allBossChances)

    const checkedBosses: CheckedBoss[] = bossChances.bosses.map(
      (boss): CheckedBoss => {
        const lastCheck = bossChecks.find((check) => boss.name === check.boss)

        return lastCheck
          ? {
              ...boss,
              checkedAt: lastCheck.checkedAt,
              checkedBy: lastCheck.checkedBy.name,
              lastSpawned: lastCheck.lastSpawned ?? undefined,
            }
          : boss
      },
    )

    return checkedBosses
  }
}
