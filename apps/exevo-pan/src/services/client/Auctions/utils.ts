import { readableCurrentDate, MILLISECONDS_IN } from 'utils'

export const filterActiveHighlights = (
  highlightedData: HighlightedAuctionData[],
): Set<number> => {
  const currentTimestamp = +new Date()
  const currentDate = readableCurrentDate()

  return new Set(
    highlightedData
      .filter(({ days }) => days.includes(currentDate))
      .filter(({ active }) => active)
      .filter(
        ({ confirmed, timestamp }) =>
          confirmed ||
          currentTimestamp - timestamp >= MILLISECONDS_IN.MINUTE * 15,
      )
      .map(({ id }) => id),
  )
}
