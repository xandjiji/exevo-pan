export const compactNumberFormatter = (value: number): string => {
  const absValue = Math.abs(value)
  if (absValue >= 1000000000) {
    return `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')}KKK`
  }
  if (absValue >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}KK`
  }
  if (absValue >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`
  }

  return value.toString()
}
