import { shouldDisplayHighlightedAuction, MILLISECONDS_IN } from 'utils'

export const filterActiveHighlightedIds = (
  highlightedData: HighlightedAuctionData[],
): number[] => {
  const currentTimestamp = +new Date()

  return [
    ...new Set(
      highlightedData
        .filter(shouldDisplayHighlightedAuction)
        .filter(({ active }) => active)
        .filter(
          ({ confirmed, timestamp }) =>
            confirmed ||
            currentTimestamp - timestamp >= MILLISECONDS_IN.MINUTE * 15,
        )
        .map(({ id }) => id),
    ),
  ]
}
