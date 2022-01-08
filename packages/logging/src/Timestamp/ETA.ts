import { calcTimeObject, coloredText } from '../utils'
import {
  ColorKey,
  MILLISECONDS_IN_AN_HOUR,
  MILLISECONDS_IN_A_MINUTE,
  MILLISECONDS_IN_A_SECOND,
} from '../types'

const checkHours = (timestamp: number) => timestamp > MILLISECONDS_IN_AN_HOUR
const checkMinutes = (timestamp: number) => timestamp > MILLISECONDS_IN_A_MINUTE
const checkSeconds = (timestamp: number) => timestamp > MILLISECONDS_IN_A_SECOND

export const ETA = (timestamp: number, color: ColorKey = 'neutral'): string => {
  const { hours, minutes, seconds } = calcTimeObject(timestamp)

  const hoursString = checkHours(timestamp)
    ? `${coloredText(hours, color)}h `
    : ''
  const minutesString = checkMinutes(timestamp)
    ? `${coloredText(minutes, color)}m  `
    : ''
  const secondsString = checkSeconds(timestamp)
    ? `${coloredText(seconds, color)}s`
    : ''
  const leftString = secondsString ? ' left' : ''

  return `${hoursString}${minutesString}${secondsString}${leftString}`
}
