import { getDateRelativeToSS } from 'shared-utils/dist/time'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'

export const isFromSameServerSave = (a = new Date(), b = new Date()): boolean =>
  getDateRelativeToSS(a).toISOString() === getDateRelativeToSS(b).toISOString()

const raidBossesNames: TrackedBossName[] = [
  'Chizzoron the Distorter',
  'Cublarc the Plunderer',
  'Feroxa',
  'Ferumbras',
  "Gaz'haragoth",
  'Ghazbaran',
  'Grand Mother Foulscale',
  'Morgaroth',
  'Morshabaal',
  'Orshabaal',
  'The Abomination',
  'The Blightfather',
  'The Pale Count',
  'Willi Wasp',
  'Zomba',
  'Zulazza the Corruptor',
]

const raidBosses: Set<string> = new Set(raidBossesNames)

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
