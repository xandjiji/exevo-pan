import * as faker from 'faker'
import { singleSampleFrom } from '../utils'

const randomTimeStamp = () =>
  faker.datatype.number({
    min: 1500000000000,
    max: 1700000000000,
  })

const randomOnlineSnapshots = (): OnlineSnapshot[] =>
  Array.from({ length: 24 }, () => ({
    count: faker.datatype.number({ min: 20, max: 600 }),
    timeStamp: randomTimeStamp(),
  }))

const randomXPSnapshots = (canBeNegative = false): XPSnapshot[] =>
  Array.from({ length: 24 }, () => ({
    xp:
      faker.datatype.number({ min: 1000000000000, max: 4000000000000 }) *
      (canBeNegative ? +faker.datatype.boolean() * 2 - 1 : 1),
    timeStamp: randomTimeStamp(),
  }))

const coinflipNumberSign = (value: number): number =>
  value * (+faker.datatype.boolean() * 2 - 1)

const randomVocationString = () =>
  singleSampleFrom([
    'Elite Knight',
    'Royal Paladin',
    'Master Sorcerer',
    'ElderDruid',
  ])

const randomGuildMember = () => ({
  nickname: faker.name.firstName(),
  level: faker.datatype.number({ min: 45, max: 2000 }),
  vocation: randomVocationString(),
})

const randomKillDeathCount = () => ({
  kills: faker.datatype.number({ min: 0, max: 10000 }),
  deathCount: faker.datatype.number({ min: 0, max: 1000 }),
})

export const randomWarStatisticsData = (): WarStatistics => ({
  onlineCount: {
    guildA: randomOnlineSnapshots(),
    guildB: randomOnlineSnapshots(),
  },
  score: {
    guildA: faker.datatype.number({ min: 1000, max: 100000 }),
    diffGuildA: faker.datatype.number({ min: -100, max: 400 }),
    guildB: faker.datatype.number({ min: 1000, max: 100000 }),
    diffGuildB: faker.datatype.number({ min: -100, max: 400 }),
  },
  xpStats: {
    dailyXP: { guildA: randomXPSnapshots(), guildB: randomXPSnapshots() },
    dailyXPDiff: {
      guildA: randomXPSnapshots(true),
      guildB: randomXPSnapshots(true),
    },
    currentXP: {
      guildA: faker.datatype.number({
        min: 1000000000000,
        max: 4000000000000,
      }),
      guildB: faker.datatype.number({
        min: 1000000000000,
        max: 4000000000000,
      }),
    },
    todayDiff: {
      guildA: coinflipNumberSign(
        faker.datatype.number({
          min: 1000000000,
          max: 4000000000,
        }),
      ),
      guildB: coinflipNumberSign(
        faker.datatype.number({
          min: 1000000000,
          max: 4000000000,
        }),
      ),
    },
    lastDiff: {
      guildA: coinflipNumberSign(
        faker.datatype.number({
          min: 1000000000,
          max: 4000000000,
        }),
      ),
      guildB: coinflipNumberSign(
        faker.datatype.number({
          min: 1000000000,
          max: 4000000000,
        }),
      ),
    },
  },
  top10Kills: {
    guildA: Array.from({ length: 10 }, () => ({
      ...randomGuildMember(),
      ...randomKillDeathCount(),
    })),
    guildB: Array.from({ length: 10 }, () => ({
      ...randomGuildMember(),
      ...randomKillDeathCount(),
    })),
  },
  top10Deaths: {
    guildA: Array.from({ length: 10 }, () => ({
      ...randomGuildMember(),
      ...randomKillDeathCount(),
    })),
    guildB: Array.from({ length: 10 }, () => ({
      ...randomGuildMember(),
      ...randomKillDeathCount(),
    })),
  },
  lastDeaths: {
    guildA: Array.from({ length: 50 }, () => ({
      ...randomGuildMember(),
      timeStamp: randomTimeStamp(),
    })),
    guildB: Array.from({ length: 50 }, () => ({
      ...randomGuildMember(),
      timeStamp: randomTimeStamp(),
    })),
  },
})
