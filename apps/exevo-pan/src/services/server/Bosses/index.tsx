import { prisma } from 'lib/prisma'
import { getDateRelativeToSS, MILLISECONDS_IN } from 'shared-utils/dist/time'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'
import { pluckPremiumBossData } from 'utils'
import { endpoints, paths } from 'Constants'
import { multipleSpawnLocationBosses } from '../../../modules/BossHunting/bossInfo'

const MAX_RECENTLY_APPEARED_TIME_DIFF = 4 * MILLISECONDS_IN.DAY

export default class BossesClient {
  private static bossChancesUrl = `${endpoints.STATIC_DATA}${paths.BOSS_CHANCES}`

  private static getFeroxaStats(
    getNextDayFeroxa: boolean,
  ): Pick<BossStats, 'currentChance' | 'expectedIn'> {
    const SPAWN_DATE = 13
    const SSDate = getDateRelativeToSS()
    if (getNextDayFeroxa) {
      SSDate.setDate(SSDate.getDate() + 1)
    }
    const checkingDate = SSDate.getDate()

    if (checkingDate === SPAWN_DATE) {
      return { currentChance: 1 }
    }

    if (checkingDate < SPAWN_DATE) {
      return { currentChance: 0, expectedIn: SPAWN_DATE - checkingDate }
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
    getNextDayFeroxa = false,
  }: {
    server: string
    isPro: boolean
    getNextDayFeroxa?: boolean
  }): Promise<BossChances> {
    const response = await fetch(`${this.bossChancesUrl}/${server}.json`)
    const bossChances: BossChances = await response.json()

    bossChances.bosses = bossChances.bosses.map((chance) =>
      chance.name === bossTokens.Feroxa
        ? { ...chance, ...this.getFeroxaStats(getNextDayFeroxa) }
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
        bossChances.push({ ...bossChance, location: '' })
      } else {
        multipleLocationBoss.locations.forEach((location) => {
          bossChances.push({ ...bossChance, location })
        })
      }
    })

    const checkedBosses: CheckedBoss[] = bossChances.map(
      (boss): CheckedBoss => {
        const lastCheck = bossChecks.find(
          (check) =>
            boss.name === check.boss && boss.location === check.location,
        )

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

  static async fetchRecentlyAppearedBosses(
    server: string,
  ): Promise<BossStats[]> {
    const data = await this.fetchServerBossChances({ server, isPro: true })

    const pluckedPremiumData: BossStats[] = []
    data.bosses.forEach((bossStat) => {
      const { name, lastAppearence } = bossStat
      if (
        +new Date() - (lastAppearence ?? 0) >
        MAX_RECENTLY_APPEARED_TIME_DIFF
      ) {
        return
      }

      pluckedPremiumData.push({ name, lastAppearence })
    })

    return pluckedPremiumData
  }
}
