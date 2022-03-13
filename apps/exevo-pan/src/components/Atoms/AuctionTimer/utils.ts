import { CountdownObject } from './types'

export const MILLISECONDS_IN_A_MINUTE = 60000
export const MILLISECONDS_IN_AN_HOUR = 3600000
export const MILLISECONDS_IN_A_DAY = 86400000

export const calcCountdown = (
  startTime: number,
  endTime: number,
): CountdownObject => {
  const timeDiff = endTime - startTime

  const days = Math.floor(timeDiff / MILLISECONDS_IN_A_DAY)
  const hours = Math.floor(
    (timeDiff % MILLISECONDS_IN_A_DAY) / MILLISECONDS_IN_AN_HOUR,
  )
  const minutes = Math.floor(
    (timeDiff % MILLISECONDS_IN_AN_HOUR) / MILLISECONDS_IN_A_MINUTE,
  )
  const seconds = Math.floor((timeDiff % MILLISECONDS_IN_A_MINUTE) / 1000)

  return { timeDiff, days, hours, minutes, seconds }
}
