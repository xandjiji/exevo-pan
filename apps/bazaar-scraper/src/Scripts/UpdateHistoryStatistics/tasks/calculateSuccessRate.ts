export const calculateSuccessRate = (
  history: PartialCharacterObject[],
): number => {
  const totalCount = history.length
  const successCount = history.filter(
    ({ hasBeenBidded }) => hasBeenBidded,
  ).length

  const result = +((successCount / totalCount) * 100).toFixed(2)
  return Number.isNaN(result) ? 50 : result
}
