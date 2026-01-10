import { db } from 'db'
import { prisma } from 'lib/prisma'
import { MILLISECONDS_IN } from 'shared-utils/dist/time'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'
import { getFeroxaStats, pluckPremiumBossData, sortBossesBy } from 'utils'
import { endpoints, paths } from 'Constants'
import { multipleSpawnLocationBosses } from '../../../modules/BossHunting/bossInfo'

const MAX_RECENTLY_APPEARED_TIME_DIFF = 4 * MILLISECONDS_IN.DAY

export default class BossesClient {
  private static bossChancesUrl = `${endpoints.STATIC_DATA}${paths.BOSS_CHANCES}`

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
        ? { ...chance, ...getFeroxaStats(getNextDayFeroxa) }
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
      db
        .selectFrom('BossCheck as bc')
        .selectAll('bc')
        .innerJoin('GuildMember as gm', 'gm.id', 'bc.memberId')
        .select(['gm.name as checkedBy'])
        .where('bc.guildId', '=', guildId)
        .execute(),
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
              checkedBy: lastCheck.checkedBy,
              lastSpawned: lastCheck.lastSpawned ?? undefined,
            }
          : boss
      },
    )

    return checkedBosses
  }

  static async updateCheckedBosses({
    guildId,
    lastPull,
  }: {
    guildId: string
    lastPull: Date
  }) {
    return db
      .selectFrom('BossCheck')
      .where((eb) =>
        eb.and([
          eb('guildId', '=', guildId),
          eb.or([
            eb('checkedAt', '>=', lastPull),
            eb('lastSpawned', '>=', lastPull),
          ]),
        ]),
      )
      .select(['checkedAt', 'boss', 'location', 'lastSpawned', 'memberId'])
      .execute()
  }

  static async fetchAllFrozenBossCheckLogEntries({
    guildId,
    hasMemberPrivilege,
  }: {
    guildId: string
    hasMemberPrivilege: boolean
  }): Promise<{ id: string; frozenAt: Date }[]> {
    if (!hasMemberPrivilege) return []

    const entries = await db
      .selectFrom('FrozenBossCheckLog')
      .select(['id', 'frozenAt'])
      .where('guildId', '=', guildId)
      .orderBy('frozenAt', 'desc')
      .execute()

    return entries
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

    pluckedPremiumData.sort(sortBossesBy.recentlyAppeared)

    return pluckedPremiumData
  }
}
