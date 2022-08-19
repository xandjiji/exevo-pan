export type Case = {
  pointsRequired: number
  cost: {
    tc: string
    gold: string
  }
  regular: number
  durable: number
  lasting: number
  days: number
  hours: number
  minutes: number
}

export const normal: Case[] = [
  {
    pointsRequired: 4248234,
    cost: {
      tc: '370',
      gold: '3,885,000',
    },
    regular: 4,
    durable: 3,
    lasting: 0,
    days: 0,
    hours: 4,
    minutes: 7,
  },
  {
    pointsRequired: 8915,
    cost: {
      tc: '25',
      gold: '262,500',
    },
    regular: 1,
    durable: 0,
    lasting: 0,
    days: 0,
    hours: 0,
    minutes: 17,
  },
  {
    pointsRequired: 9847465155,
    cost: {
      tc: '820,645',
      gold: '8,616,772,500',
    },
    regular: 1,
    durable: 6,
    lasting: 1139,
    days: 379,
    hours: 22,
    minutes: 17,
  },
]

export const exerciseDummy: Case[] = [
  {
    pointsRequired: 4248234,
    cost: {
      tc: '345',
      gold: '3,622,500',
    },
    regular: 3,
    durable: 3,
    lasting: 0,
    days: 0,
    hours: 3,
    minutes: 50,
  },
  {
    pointsRequired: 8915,
    cost: {
      tc: '25',
      gold: '262,500',
    },
    regular: 1,
    durable: 0,
    lasting: 0,
    days: 0,
    hours: 0,
    minutes: 17,
  },
  {
    pointsRequired: 9847465155,
    cost: {
      tc: '746,035',
      gold: '7,833,367,500',
    },
    regular: 1,
    durable: 1,
    lasting: 1036,
    days: 345,
    hours: 9,
    minutes: 17,
  },
]
