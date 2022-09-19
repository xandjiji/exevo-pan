import {
  TrackedBossName,
  constTokens as bossDictionary,
} from 'data-dictionary/dist/dictionaries/bosses'

export const schema = new Map<TrackedBossName, BossSchema>()

const DEFAULT_SCHEMA: BossSchema = {
  forceUnknown: false,
}

Object.values(bossDictionary).forEach((bossName) =>
  schema.set(bossName, DEFAULT_SCHEMA),
)

schema.set('Apprentice Sheng', {
  fixedDaysFrequency: {
    min: 1,
    max: 8,
  },
  forceUnknown: false,
})

schema.set('Arachir the Ancient One', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
  forceUnknown: false,
})

schema.set('Barbaria', {
  fixedDaysFrequency: {
    min: 8,
    max: 10,
  },
  forceUnknown: false,
})

schema.set('Battlemaster Zunzu', {
  fixedDaysFrequency: {
    min: 1,
    max: 3,
  },
  forceUnknown: false,
})

schema.set('Big Boss Trolliver', {
  fixedDaysFrequency: {
    min: 3,
    max: 5,
  },
  forceUnknown: false,
})

schema.set('Burster', {
  forceUnknown: true,
})

schema.set('Captain Jones', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
  forceUnknown: false,
})

schema.set('Chizzoron the Distorter', {
  fixedDaysFrequency: {
    min: 8,
    max: 19,
  },
  forceUnknown: false,
})

schema.set('Countess Sorrow', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
  forceUnknown: false,
})

schema.set('Crustacea Gigantica', {
  forceUnknown: true,
})

schema.set('Cublarc the Plunderer', {
  fixedDaysFrequency: {
    min: 1,
    max: 7,
  },
  forceUnknown: false,
})

schema.set('Dharalion', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
  forceUnknown: false,
})

schema.set('Diblis the Fair', {
  fixedDaysFrequency: {
    min: 10,
    max: 15,
  },
  forceUnknown: false,
})

schema.set('Dracola', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
  forceUnknown: false,
})

schema.set('Draptor', {
  fixedDaysFrequency: {
    min: 1,
    max: 3,
  },
  forceUnknown: false,
})

schema.set('Dreadful Disruptor', {
  forceUnknown: true,
})

schema.set('Dreadmaw', {
  fixedDaysFrequency: {
    min: 1,
    max: 16,
  },
  forceUnknown: false,
})

schema.set('Fernfang', {
  fixedDaysFrequency: {
    min: 20,
    max: 27,
  },
  forceUnknown: false,
})

schema.set('Ferumbras', {
  fixedDaysFrequency: {
    min: 162,
    max: 174,
  },
  forceUnknown: false,
})
