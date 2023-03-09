import { MILLISECONDS_IN } from 'utils'

export const hoursAgo = (lastAppearence = 0): number =>
  Math.round((+new Date() - lastAppearence) / MILLISECONDS_IN.HOUR)
