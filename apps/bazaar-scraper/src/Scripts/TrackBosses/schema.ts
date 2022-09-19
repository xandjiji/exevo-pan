import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'

export const schema = new Map<TrackedBossName, BossSchema>()

schema.set('Apprentice Sheng', {
  fixedDaysFrequency: {
    min: 1,
    max: 8,
  },
})

schema.set('Arachir the Ancient One', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

schema.set('Barbaria', {
  fixedDaysFrequency: {
    min: 8,
    max: 10,
  },
})

schema.set('Battlemaster Zunzu', {
  fixedDaysFrequency: {
    min: 1,
    max: 3,
  },
})

schema.set('Big Boss Trolliver', {
  fixedDaysFrequency: {
    min: 3,
    max: 5,
  },
})

schema.set('Captain Jones', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

schema.set('Chizzoron the Distorter', {
  fixedDaysFrequency: {
    min: 8,
    max: 19,
  },
})

schema.set('Countess Sorrow', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

schema.set('Cublarc the Plunderer', {
  fixedDaysFrequency: {
    min: 1,
    max: 7,
  },
})

schema.set('Dharalion', {
  fixedDaysFrequency: {
    min: 6,
    max: 8,
  },
})

schema.set('Diblis the Fair', {
  fixedDaysFrequency: {
    min: 10,
    max: 15,
  },
})

schema.set('Dracola', {
  fixedDaysFrequency: {
    min: 14,
    max: 20,
  },
})

schema.set('Draptor', {
  fixedDaysFrequency: {
    min: 1,
    max: 3,
  },
})

schema.set('Dreadmaw', {
  fixedDaysFrequency: {
    min: 1,
    max: 16,
  },
})

schema.set('Fernfang', {
  fixedDaysFrequency: {
    min: 20,
    max: 27,
  },
})

schema.set('Ferumbras', {
  fixedDaysFrequency: {
    min: 162,
    max: 174,
  },
})
