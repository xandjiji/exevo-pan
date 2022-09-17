import { sortBossesBy } from 'utils'
import { constTokens as bosses } from 'data-dictionary/dist/dictionaries/bosses'
import { BossLister } from './types'

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

export const listBy = {
  chance,
  recent,
  name,
  POI,
  vampires,
  archdemons,
}
