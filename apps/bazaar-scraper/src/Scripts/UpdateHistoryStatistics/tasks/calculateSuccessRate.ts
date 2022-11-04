import { broadcast } from 'logging'

export const calculateSuccessRate = (
  history: PartialCharacterObject[],
): number => {
  broadcast('Calculating auction success rate...', 'neutral')

  const totalCount = history.length
  const successCount = history.filter(
    ({ hasBeenBidded }) => hasBeenBidded,
  ).length

  const result = +((successCount / totalCount) * 100).toFixed(2)
  return Number.isNaN(result) ? 50 : result
}
