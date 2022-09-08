import { randomDataset } from 'utils/test'
import { readableCurrentDate, MILLISECONDS_IN } from 'utils'

export const { characterData } = randomDataset()

const pastTimestamp = +new Date() + MILLISECONDS_IN.HOUR

const today = readableCurrentDate()
export const inactiveAuctions: HighlightedAuctionData[] = [
  {
    active: true,
    days: ['10/11/1998', '23/12/2099'],
    id: 1,
    nickname: '1',
    timestamp: pastTimestamp,
    confirmed: false,
  },
  {
    active: false,
    days: ['10/11/1998', today, '23/12/2099'],
    id: 2,
    nickname: '2',
    timestamp: pastTimestamp,
    confirmed: false,
  },
  {
    active: true,
    days: ['10/11/1998', today, '23/12/2099'],
    id: 3,
    nickname: '3',
    timestamp: +new Date(),
    confirmed: false,
  },
]

export const activeAuctions: HighlightedAuctionData[] = [
  {
    active: true,
    days: ['10/11/1998', today, '23/12/2099'],
    id: 4,
    nickname: '4',
    timestamp: 1,
    confirmed: false,
  },
  {
    active: true,
    days: ['10/11/1998', today, '23/12/2099'],
    id: 5,
    nickname: '5',
    timestamp: pastTimestamp,
    confirmed: false,
  },
  {
    active: true,
    days: ['10/11/1998', today, '23/12/2099'],
    id: 5,
    nickname: '5',
    timestamp: +new Date(),
    confirmed: true,
  },
]
