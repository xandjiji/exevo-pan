import { getFromLocalStorage, sortBossesBy } from 'utils'
import { constTokens as bosses } from 'data-dictionary/dist/dictionaries/bosses'
import { premiumBosses } from 'Constants'
import { BossLister, PINNED_BOSS_KEY } from './types'

const POISet = new Set<string>([
  bosses['Countess Sorrow'],
  bosses.Dracola,
  bosses.Massacre,
  bosses['Mr. Punish'],
  bosses['The Imperor'],
  bosses['The Handmaiden'],
  bosses['The Plasmother'],
])

const vampiresSet = new Set<string>([
  bosses['Arachir the Ancient One'],
  bosses['Diblis the Fair'],
  bosses['Sir Valorcrest'],
  bosses['The Pale Count'],
  bosses['Zevelon Duskbringer'],
])

const archdemonsSet = new Set<string>([
  bosses["Gaz'haragoth"],
  bosses.Ferumbras,
  bosses.Ghazbaran,
  bosses.Morgaroth,
  bosses.Morshabaal,
  bosses.Omrafir,
  bosses.Orshabaal,
  bosses['The Abomination'],
  bosses.Rotrender,
])

const rookSet = new Set<string>([
  bosses['Apprentice Sheng'],
  bosses.Munster,
  bosses['Rottie the Rotworm'],
  bosses.Teleskor,
])

const chance: BossLister = (list) => [...list].sort(sortBossesBy.chance)

const recent: BossLister = (list) =>
  [...list].sort(sortBossesBy.recentlyAppeared)

const name: BossLister = (list) => [...list].sort(sortBossesBy.name)

const POI: BossLister = (list) =>
  list.filter((boss) => POISet.has(boss.name)).sort(sortBossesBy.chance)

const vampires: BossLister = (list) =>
  list.filter((boss) => vampiresSet.has(boss.name)).sort(sortBossesBy.chance)

const archdemons: BossLister = (list) =>
  list.filter((boss) => archdemonsSet.has(boss.name)).sort(sortBossesBy.chance)

const rook: BossLister = (list) =>
  list.filter((boss) => rookSet.has(boss.name)).sort(sortBossesBy.chance)

const pinned: BossLister = (list) => {
  const pinnedSet = new Set(getFromLocalStorage<string[]>(PINNED_BOSS_KEY, []))

  return list
    .filter((boss) => pinnedSet.has(boss.name))
    .sort(sortBossesBy.chance)
}

export const listBy = {
  chance,
  recent,
  name,
  POI,
  vampires,
  archdemons,
  rook,
  pinned,
}

export const prioritizePremium: BossLister = (list) => {
  const premium: BossStats[] = []
  const free: BossStats[] = []

  list.forEach((bossStat) => {
    if (premiumBosses.set.has(bossStat.name)) {
      premium.push(bossStat)
    } else {
      free.push(bossStat)
    }
  })

  return premium.concat(free)
}
