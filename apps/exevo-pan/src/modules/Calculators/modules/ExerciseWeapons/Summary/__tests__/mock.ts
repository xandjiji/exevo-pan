export type SummaryData = {
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

export type Case = {
  pointsRequired: number
  summaries: SummaryData[]
}

/* the summaries must reflect this user interaction:

    0- Nothing
    1- Clicking on the 'Exercise dummy' checkbox
    2- Clicking on the 'Double event' checkbox
    3- Selecting the 'Durable (1800 charges)' option
*/

export const cases: Case[] = [
  {
    pointsRequired: 4248234,
    summaries: [
      {
        cost: {
          tc: '370',
          gold: '5,138,888',
        },
        regular: 4,
        durable: 3,
        lasting: 0,
        days: 0,
        hours: 4,
        minutes: 7,
      },
      {
        cost: {
          tc: '345',
          gold: '4,791,666',
        },
        regular: 3,
        durable: 3,
        lasting: 0,
        days: 0,
        hours: 3,
        minutes: 50,
      },
      {
        cost: {
          tc: '165',
          gold: '2,291,666',
        },
        regular: 3,
        durable: 1,
        lasting: 0,
        days: 0,
        hours: 1,
        minutes: 50,
      },
      {
        cost: {
          tc: '180',
          gold: '2,500,000',
        },
        regular: 0,
        durable: 2,
        lasting: 0,
        days: 0,
        hours: 2,
        minutes: 0,
      },
    ],
  },
  {
    pointsRequired: 8915,
    summaries: [
      {
        cost: {
          tc: '25',
          gold: '347,222',
        },
        regular: 1,
        durable: 0,
        lasting: 0,
        days: 0,
        hours: 0,
        minutes: 17,
      },
      {
        cost: {
          tc: '25',
          gold: '347,222',
        },
        regular: 1,
        durable: 0,
        lasting: 0,
        days: 0,
        hours: 0,
        minutes: 17,
      },
      {
        cost: {
          tc: '25',
          gold: '347,222',
        },
        regular: 1,
        durable: 0,
        lasting: 0,
        days: 0,
        hours: 0,
        minutes: 17,
      },
      {
        cost: {
          tc: '90',
          gold: '1,250,000',
        },
        regular: 0,
        durable: 1,
        lasting: 0,
        days: 0,
        hours: 1,
        minutes: 0,
      },
    ],
  },
  {
    pointsRequired: 9847465155,
    summaries: [
      {
        cost: {
          tc: '820,645',
          gold: '11,397,847,222',
        },
        regular: 1,
        durable: 6,
        lasting: 1139,
        days: 379,
        hours: 22,
        minutes: 17,
      },
      {
        cost: {
          tc: '746,035',
          gold: '10,361,597,222',
        },
        regular: 1,
        durable: 1,
        lasting: 1036,
        days: 345,
        hours: 9,
        minutes: 17,
      },
      {
        cost: {
          tc: '373,035',
          gold: '5,181,041,666',
        },
        regular: 3,
        durable: 0,
        lasting: 518,
        days: 172,
        hours: 16,
        minutes: 50,
      },
      {
        cost: {
          tc: '373,050',
          gold: '5,181,250,000',
        },
        regular: 0,
        durable: 4145,
        lasting: 0,
        days: 172,
        hours: 17,
        minutes: 0,
      },
    ],
  },
]
