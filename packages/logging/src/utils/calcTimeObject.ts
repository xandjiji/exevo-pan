import {
  TimeObject,
  MILLISECONDS_IN_AN_HOUR,
  MILLISECONDS_IN_A_MINUTE,
  MILLISECONDS_IN_A_SECOND,
} from '../types'

export const calcTimeObject = (timestamp: number): TimeObject => {
  let millisecondsLeft = timestamp

  const hours = Math.floor(millisecondsLeft / MILLISECONDS_IN_AN_HOUR)

  millisecondsLeft -= hours * MILLISECONDS_IN_AN_HOUR
  const minutes = Math.floor(millisecondsLeft / MILLISECONDS_IN_A_MINUTE)

  millisecondsLeft -= minutes * MILLISECONDS_IN_A_MINUTE
  const seconds = Math.floor(millisecondsLeft / MILLISECONDS_IN_A_SECOND)

  return { hours, minutes, seconds }
}
