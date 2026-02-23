import { getDateRelativeToSS } from 'shared-utils/dist/time'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'

export const isFromSameServerSave = (a = new Date(), b = new Date()): boolean =>
  getDateRelativeToSS(a).toISOString() === getDateRelativeToSS(b).toISOString()

export const raidBossesNames: TrackedBossName[] = [
  'Chizzoron the Distorter',
  'Cublarc the Plunderer',
  'Feroxa',
  'Ferumbras',
  "Gaz'haragoth",
  'Ghazbaran',
  'Grand Mother Foulscale',
  'Morgaroth',
  'Morshabaal',
  'Nimmersatt',
  'Orshabaal',
  'Rotrender',
  'Sir Leopold',
  'The Abomination',
  'The Blightfather',
  'The Pale Count',
  'Willi Wasp',
  'Zomba',
  'Zulazza the Corruptor',
]

const raidBosses: Set<string> = new Set(raidBossesNames)

export const sharedSpawnBossesNames: TrackedBossName[] = [
  'Burster',
  'Dreadful Disruptor',
  'Mahatheb',
  'The Hungerer',
  'The Manhunter',
  'The Mean Masher',
]

const sharedSpawnBosses: Set<string> = new Set(sharedSpawnBossesNames)

export const rookBossesNames: TrackedBossName[] = [
  'Apprentice Sheng',
  'Munster',
  'Rottie the Rotworm',
  'Teleskor',
]

const rookSpawnBosses: Set<string> = new Set(rookBossesNames)

export const creatureNames: TrackedBossName[] = [
  'Albino Dragon',
  'Crustacea Gigantica',
  'Dire Penguin',
  'Draptor',
  'Midnight Panther',
  'Undead Cavebear',
  'Yeti',
]

const creatureBosses: Set<string> = new Set(creatureNames)

export const hiveStage3BossesNames: TrackedBossName[] = [
  'Chopper',
  'Fleshslicer',
  'Maw',
  'Mindmasher',
  'Rotspit',
  'Shadowstalker',
]

const hiveStage3Bosses: Set<string> = new Set(hiveStage3BossesNames)

export const vampireBossesNames: TrackedBossName[] = [
  'Arachir the Ancient One',
  'Diblis the Fair',
  'Sir Valorcrest',
  'Zevelon Duskbringer',
]

const vampireBosses: Set<string> = new Set(vampireBossesNames)

export const bankBossesNames: TrackedBossName[] = [
  'Elvira Hammerthrust',
  'Jesse the Wicked',
  'Mornenion',
  'Robby the Reckless',
]

const bankBosses: Set<string> = new Set(bankBossesNames)

export const infernoPitsBossesNames: TrackedBossName[] = [
  'Countess Sorrow',
  'Dracola',
  'Massacre',
  'Mr. Punish',
  'The Handmaiden',
  'The Imperor',
  'The Plasmother',
]

const infernoPitsBosses: Set<string> = new Set(infernoPitsBossesNames)

export const checkIfBoss = {
  isSharedSpawn: ({ name }: CheckedBoss): boolean =>         sharedSpawnBosses.has(name),
  isRook: ({ name }: CheckedBoss): boolean =>                rookSpawnBosses.has(name),
  isCreature: ({ name }: CheckedBoss): boolean =>            creatureBosses.has(name),
  isHiveStage3: ({ name }: CheckedBoss): boolean =>          hiveStage3Bosses.has(name),
  isVampire: ({ name }: CheckedBoss): boolean =>             vampireBosses.has(name),
  isBank: ({ name }: CheckedBoss): boolean =>                bankBosses.has(name),
  isInfernoPits: ({ name }: CheckedBoss): boolean =>         infernoPitsBosses.has(name),
  appearOnlyOnRaids: ({ name }: CheckedBoss): boolean =>     raidBosses.has(name),
  hasNoChance: ({
    lastSpawned,
    daysLeftForPossibleSpawns,
    currentChance,
  }: CheckedBoss): boolean => {
    if (lastSpawned && isFromSameServerSave(lastSpawned)) {
      return true
    }

    if (daysLeftForPossibleSpawns) {
      return !daysLeftForPossibleSpawns.some((daysLeft) => daysLeft <= 0)
    }

    return currentChance === 0
  },
}
