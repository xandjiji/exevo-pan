import { coloredText } from 'logging'

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const MAX_DAYS_RANGE = 28

type TimestampRange = [number, number]

const getCurrentTimestamp = () => {
  const stringDate = new Date().toDateString()
  return Math.round(+new Date(stringDate) / 1000)
}

export const getLastTimestampsRange = (
  daysRange = MAX_DAYS_RANGE,
): TimestampRange[] => {
  let today = getCurrentTimestamp()

  const ranges: TimestampRange[] = []
  for (let i = 0; i < daysRange; i += 1) {
    const yesterday = today - DAY
    ranges.push([yesterday, today])

    today = yesterday
  }

  return ranges.reverse()
}

export const filterAuctionsByTimestampRange = (
  [from, to]: TimestampRange,
  history: PartialCharacterObject[],
): PartialCharacterObject[] =>
  history.filter(({ auctionEnd }) => auctionEnd >= from && auctionEnd <= to)

const toReadableTimestamp = (timestamp: number): string => {
  const [weekday, month, day, year] = new Date(timestamp * 1000)
    .toDateString()
    .split(' ')

  return `${month} ${day}, ${year}`
}

const toReadableDate = (timestamp: number): string =>
  coloredText(toReadableTimestamp(timestamp), 'highlight')

export const toReadableRange = ([from, to]: TimestampRange): string =>
  `${coloredText('[', 'system')}from ${toReadableDate(
    from,
  )} to ${toReadableDate(to)}${coloredText(']', 'system')}`
