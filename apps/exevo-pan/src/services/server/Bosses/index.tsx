import { prisma } from 'lib/prisma'
import { getDateRelativeToSS, MILLISECONDS_IN } from 'shared-utils/dist/time'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'
import { pluckPremiumBossData } from 'utils'
import { endpoints, paths } from 'Constants'
import { multipleSpawnLocationBosses } from '../../../modules/BossHunting/bossInfo'

export default class BossesClient {
  private static bossChancesUrl = `${endpoints.STATIC_DATA}${paths.BOSS_CHANCES}`

  private static getFeroxaStats(): Pick<
    BossStats,
    'currentChance' | 'expectedIn'
  > {
    const SPAWN_DATE = 13
    const tomorrow = getDateRelativeToSS()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowSSDay = tomorrow.getDate()

    if (tomorrowSSDay === SPAWN_DATE) {
      return { currentChance: 1 }
    }

    if (tomorrowSSDay < SPAWN_DATE) {
      return { currentChance: 0, expectedIn: SPAWN_DATE - tomorrowSSDay }
    }

    const nextFeroxaSpawn = getDateRelativeToSS()
    nextFeroxaSpawn.setMonth(nextFeroxaSpawn.getMonth() + 1)
    nextFeroxaSpawn.setDate(SPAWN_DATE)

    return {
      currentChance: 0,
      expectedIn: Math.round(
        (+nextFeroxaSpawn - +getDateRelativeToSS()) / MILLISECONDS_IN.DAY,
      ),
    }
  }

  static async fetchServerBossChances({
    server,
    isPro,
  }: {
    server: string
    isPro: boolean
  }): Promise<BossChances> {
    const response = await fetch(`${this.bossChancesUrl}/${server}.json`)
    const bossChances: BossChances = await response.json()

    bossChances.bosses = bossChances.bosses.map((chance) =>
      chance.name === bossTokens.Feroxa
        ? { ...chance, ...this.getFeroxaStats() }
        : chance,
    )

    return isPro ? bossChances : pluckPremiumBossData(bossChances)
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
      this.fetchServerBossChances({ server, isPro }),
    ])

    const serverBossData: typeof allBossChances = isPro
      ? allBossChances
      : pluckPremiumBossData(allBossChances)

    const bossChances: CheckedBoss[] = []
    serverBossData.bosses.forEach((bossChance) => {
      const multipleLocationBoss = multipleSpawnLocationBosses.entries.find(
        ({ name }) => bossChance.name === name,
      )
      if (!multipleLocationBoss) {
        bossChances.push(bossChance)
      } else {
        multipleLocationBoss.locations.forEach((location) => {
          bossChances.push({ ...bossChance, location })
        })
      }
    })

    const checkedBosses: CheckedBoss[] = bossChances.map(
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
