/* eslint-disable no-restricted-syntax */
import type { TrackedBossName } from './bosses'

type DaysRange = {
  min: number
  max: number
}

type BossSchema = {
  fixedDaysFrequency: DaysRange
  spawnCount?: number
}

export const bossStatistics = new Map<TrackedBossName, BossSchema>()

bossStatistics.set('Albino Dragon', {
  fixedDaysFrequency: {
    min: 1,
    max: 1,
  },
  spawnCount: 5,
})

bossStatistics.set('Apprentice Sheng', {
  fixedDaysFrequency: {
    min: 1,
    max: 8,
  },
})

bossStatistics.set('Arachir the Ancient One', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('Arthom The Hunter', {
  fixedDaysFrequency: {
    min: 1,
    max: 4,
  },
})

bossStatistics.set('Barbaria', {
  fixedDaysFrequency: {
    min: 8,
    max: 12,
  },
})

bossStatistics.set('Battlemaster Zunzu', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
  spawnCount: 2,
})

bossStatistics.set('Big Boss Trolliver', {
  fixedDaysFrequency: {
    min: 3,
    max: 5,
  },
})

bossStatistics.set('Captain Jones', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('Chizzoron the Distorter', {
  fixedDaysFrequency: {
    min: 7,
    max: 19,
  },
})

bossStatistics.set('Countess Sorrow', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

bossStatistics.set('Cublarc the Plunderer', {
  fixedDaysFrequency: {
    min: 1,
    max: 7,
  },
})

bossStatistics.set('Dharalion', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('Diblis the Fair', {
  fixedDaysFrequency: {
    min: 10,
    max: 15,
  },
})

bossStatistics.set('Dracola', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

bossStatistics.set('Draptor', {
  fixedDaysFrequency: {
    min: 1,
    max: 9,
  },
})

bossStatistics.set('Dreadmaw', {
  fixedDaysFrequency: {
    min: 12,
    max: 24,
  },
  spawnCount: 2,
})

bossStatistics.set('Fernfang', {
  fixedDaysFrequency: {
    min: 20,
    max: 27,
  },
})

bossStatistics.set('Ferumbras', {
  fixedDaysFrequency: {
    min: 162,
    max: 174,
  },
})

bossStatistics.set('Flamecaller Zazrak', {
  fixedDaysFrequency: {
    min: 6,
    max: 19,
  },
  spawnCount: 2,
})

bossStatistics.set('Fleabringer', {
  fixedDaysFrequency: {
    min: 1,
    max: 3,
  },
  spawnCount: 3,
})

bossStatistics.set('Foreman Kneebiter', {
  fixedDaysFrequency: {
    min: 3,
    max: 6,
  },
})

bossStatistics.set('Furyosa', {
  fixedDaysFrequency: {
    min: 14,
    max: 28,
  },
})

bossStatistics.set("Gaz'haragoth", {
  fixedDaysFrequency: {
    min: 14,
    max: 27,
  },
})

bossStatistics.set('General Murius', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('Ghazbaran', {
  fixedDaysFrequency: {
    min: 162,
    max: 174,
  },
})

bossStatistics.set('Grand Mother Foulscale', {
  fixedDaysFrequency: {
    min: 5,
    max: 9,
  },
})

bossStatistics.set('Grandfather Tridian', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('Gravelord Oshuran', {
  fixedDaysFrequency: {
    min: 7,
    max: 11,
  },
})

bossStatistics.set('Hairman the Huge', {
  fixedDaysFrequency: {
    min: 6,
    max: 9,
  },
})

bossStatistics.set('Hatebreeder', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('High Templar Cobrass', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('Hirintror', {
  fixedDaysFrequency: {
    min: 10,
    max: 29,
  },
  spawnCount: 2,
})

bossStatistics.set('Man in the Cave', {
  fixedDaysFrequency: {
    min: 13,
    max: 15,
  },
})

bossStatistics.set('Massacre', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

bossStatistics.set('Midnight Panther', {
  fixedDaysFrequency: {
    min: 3,
    max: 3,
  },
})

bossStatistics.set('Morgaroth', {
  fixedDaysFrequency: {
    min: 168,
    max: 174,
  },
})

bossStatistics.set('Morshabaal', {
  fixedDaysFrequency: {
    min: 154,
    max: 174,
  },
})

bossStatistics.set('Mr. Punish', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

bossStatistics.set('Munster', {
  fixedDaysFrequency: {
    min: 1,
    max: 6,
  },
})

bossStatistics.set('Ocyakao', {
  fixedDaysFrequency: {
    min: 16,
    max: 25,
  },
})

bossStatistics.set('Omrafir', {
  fixedDaysFrequency: {
    min: 14,
    max: 27,
  },
})

bossStatistics.set('Oodok Witchmaster', {
  fixedDaysFrequency: {
    min: 1,
    max: 4,
  },
})

bossStatistics.set('Orshabaal', {
  fixedDaysFrequency: {
    min: 154,
    max: 174,
  },
})

bossStatistics.set('Rotrender', {
  fixedDaysFrequency: {
    min: 162,
    max: 174,
  },
})

bossStatistics.set('Rottie the Rotworm', {
  fixedDaysFrequency: {
    min: 2,
    max: 2,
  },
  spawnCount: 2,
})

bossStatistics.set('Rotworm Queen', {
  fixedDaysFrequency: {
    min: 12,
    max: 15,
  },
  spawnCount: 4,
})

bossStatistics.set('Rukor Zad', {
  fixedDaysFrequency: {
    min: 6,
    max: 9,
  },
})

bossStatistics.set('Rukor Zad', {
  fixedDaysFrequency: {
    min: 6,
    max: 9,
  },
})

bossStatistics.set('Shlorg', {
  fixedDaysFrequency: {
    min: 14,
    max: 28,
  },
})

bossStatistics.set('Sir Leopold', {
  fixedDaysFrequency: {
    min: 999,
    max: 999,
  },
})

bossStatistics.set('Sir Valorcrest', {
  fixedDaysFrequency: {
    min: 5,
    max: 8,
  },
})

bossStatistics.set('Smuggler Baron Silvertoe', {
  fixedDaysFrequency: {
    min: 8,
    max: 14,
  },
})

bossStatistics.set('Teleskor', {
  fixedDaysFrequency: {
    min: 1,
    max: 3,
  },
})

bossStatistics.set('The Abomination', {
  fixedDaysFrequency: {
    min: 154,
    max: 174,
  },
})

bossStatistics.set('The Big Bad One', {
  fixedDaysFrequency: {
    min: 6,
    max: 10,
  },
})

bossStatistics.set('The Blightfather', {
  fixedDaysFrequency: {
    min: 5,
    max: 9,
  },
})

bossStatistics.set('The Blightfather', {
  fixedDaysFrequency: {
    min: 5,
    max: 9,
  },
})

bossStatistics.set('The Evil Eye', {
  fixedDaysFrequency: {
    min: 6,
    max: 11,
  },
})

bossStatistics.set('The Frog Prince', {
  fixedDaysFrequency: {
    min: 12,
    max: 18,
  },
})

bossStatistics.set('The Handmaiden', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

bossStatistics.set('The Imperor', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

bossStatistics.set('The Old Whopper', {
  fixedDaysFrequency: {
    min: 5,
    max: 9,
  },
})

bossStatistics.set('The Pale Count', {
  fixedDaysFrequency: {
    min: 16,
    max: 29,
  },
})

bossStatistics.set('The Plasmother', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

bossStatistics.set('The Voice Of Ruin', {
  fixedDaysFrequency: {
    min: 6,
    max: 9,
  },
  spawnCount: 2,
})

bossStatistics.set('The Welter', {
  fixedDaysFrequency: {
    min: 16,
    max: 28,
  },
})

bossStatistics.set('Tyrn', {
  fixedDaysFrequency: {
    min: 12,
    max: 28,
  },
  spawnCount: 2,
})

bossStatistics.set('Tzumrah The Dazzler', {
  fixedDaysFrequency: {
    min: 20,
    max: 28,
  },
})

bossStatistics.set('Undead Cavebear', {
  fixedDaysFrequency: {
    min: 2,
    max: 3,
  },
})

bossStatistics.set('Warlord Ruzad', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('White Pale', {
  fixedDaysFrequency: {
    min: 15,
    max: 28,
  },
  spawnCount: 3,
})

bossStatistics.set('Willi Wasp', {
  fixedDaysFrequency: {
    min: 5,
    max: 9,
  },
})

bossStatistics.set('Xenia', {
  fixedDaysFrequency: {
    min: 7,
    max: 13,
  },
})

bossStatistics.set('Yaga the Crone', {
  fixedDaysFrequency: {
    min: 5,
    max: 7,
  },
})

bossStatistics.set('Yeti', {
  fixedDaysFrequency: {
    min: 18,
    max: 24,
  },
})

bossStatistics.set('Zarabustor', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

bossStatistics.set('Zevelon Duskbringer', {
  fixedDaysFrequency: {
    min: 6,
    max: 9,
  },
})

bossStatistics.set('Zomba', {
  fixedDaysFrequency: {
    min: 3,
    max: 8,
  },
})

bossStatistics.set('Zulazza the Corruptor', {
  fixedDaysFrequency: {
    min: 7,
    max: 19,
  },
})

bossStatistics.set('Zushuka', {
  fixedDaysFrequency: {
    min: 19,
    max: 28,
  },
})

/* normalizing day range to account for differences between server save updates */
for (const [bossName, bossSchema] of bossStatistics.entries()) {
  const { min, max } = bossSchema.fixedDaysFrequency
  bossStatistics.set(bossName, {
    ...bossSchema,
    fixedDaysFrequency: {
      min: min - 1,
      max: max + 1,
    },
  })
}
