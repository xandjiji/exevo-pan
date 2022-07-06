import { MILLISECONDS_IN } from 'utils'
import { CountdownObject } from './types'

export const calcCountdown = (
  startTime: number,
  endTime: number,
): CountdownObject => {
  const timeDiff = endTime - startTime

  const days = Math.floor(timeDiff / MILLISECONDS_IN.DAY)
  const hours = Math.floor(
    (timeDiff % MILLISECONDS_IN.DAY) / MILLISECONDS_IN.HOUR,
  )
  const minutes = Math.floor(
    (timeDiff % MILLISECONDS_IN.HOUR) / MILLISECONDS_IN.MINUTE,
  )
  const seconds = Math.floor((timeDiff % MILLISECONDS_IN.MINUTE) / 1000)

  return { timeDiff, days, hours, minutes, seconds }
}
