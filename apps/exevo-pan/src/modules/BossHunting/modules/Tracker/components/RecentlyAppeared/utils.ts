import { MILLISECONDS_IN } from 'utils'

const APPROX_TIME_OFFSET = MILLISECONDS_IN.DAY * 1.5

export const hoursAgo = (lastAppearence = 0): number =>
  Math.round(
    (+new Date() - APPROX_TIME_OFFSET - lastAppearence) / MILLISECONDS_IN.HOUR,
  )
