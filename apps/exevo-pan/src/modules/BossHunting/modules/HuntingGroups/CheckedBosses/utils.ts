import { getDateRelativeToSS } from 'shared-utils/dist/time'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { bossInfo } from '../../../bossInfo'

export const isFromSameServerSave = (a = new Date(), b = new Date()): boolean =>
  getDateRelativeToSS(a).toISOString() === getDateRelativeToSS(b).toISOString()

const raidBossExceptions: Set<TrackedBossName> = new Set(['Draptor'])

export const checkIfBoss = {
  appearOnlyOnRaids: ({ name }: CheckedBoss): boolean =>
    !!bossInfo.get(name as TrackedBossName)?.raidMessages?.length &&
    !raidBossExceptions.has(name as TrackedBossName),
  hasNoChance: ({
    daysLeftForPossibleSpawns,
    currentChance,
  }: CheckedBoss): boolean =>
    daysLeftForPossibleSpawns
      ? daysLeftForPossibleSpawns.some((daysLeft) => daysLeft <= 0)
      : currentChance === 0,
}
