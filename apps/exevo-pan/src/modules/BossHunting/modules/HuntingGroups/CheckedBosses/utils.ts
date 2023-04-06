import { getDateRelativeToSS } from 'shared-utils/dist/time'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { bossInfo } from '../../../bossInfo'

export const isFromSameServerSave = (a = new Date(), b = new Date()): boolean =>
  getDateRelativeToSS(a).toISOString() === getDateRelativeToSS(b).toISOString()

const raidBossExceptions: Set<TrackedBossName> = new Set(['Draptor'])
const raidBosses: Set<string> = new Set(
  Array.from(bossInfo)
    .filter(
      ([boss, info]) =>
        !!info.raidMessages?.length && !raidBossExceptions.has(boss),
    )
    .map(([boss]) => boss),
)

console.log(raidBosses)

export const checkIfBoss = {
  appearOnlyOnRaids: ({ name }: CheckedBoss): boolean => raidBosses.has(name),
  hasNoChance: ({
    daysLeftForPossibleSpawns,
    currentChance,
  }: CheckedBoss): boolean =>
    daysLeftForPossibleSpawns
      ? !daysLeftForPossibleSpawns.some((daysLeft) => daysLeft <= 0)
      : currentChance === 0,
}
