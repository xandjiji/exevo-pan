import { dateToDateObject } from 'utils'

const MILLISECONDS_IN_A_DAY = 86400000
const today = new Date()
const yesterday = new Date(+today - MILLISECONDS_IN_A_DAY)
const tomorrow = new Date(+today + MILLISECONDS_IN_A_DAY)

const [convertedToday, convertedYesterday, convertedTomorrow] = [
  today,
  yesterday,
  tomorrow,
].map((date: Date) => {
  const { day, month, year } = dateToDateObject(date)
  return `${day}/${month}/${year}`
})

export const mockedHighlightedAuctionData: HighlightedAuction[] = [
  { id: 1, days: [convertedToday, convertedYesterday, convertedTomorrow] },
  { id: 2, days: [convertedToday] },
  { id: 3, days: [convertedYesterday] },
  { id: 4, days: [convertedTomorrow] },
  { id: 5, days: [convertedYesterday, convertedTomorrow] },
]
