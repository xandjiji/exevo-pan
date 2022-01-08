import { calcTimeObject, coloredText, plural } from '../utils'
import { ColorKey } from '../types'

export const humanReadable = (
  timestamp: number,
  color: ColorKey = 'neutral',
): string => {
  const { hours, seconds, minutes } = calcTimeObject(timestamp)

  const hoursString = hours
    ? `${coloredText(hours, color)} hour${plural(hours)}, `
    : ''
  const minutesString = minutes
    ? `${coloredText(minutes, color)} minute${plural(minutes)} and `
    : ''
  const secondsString = seconds
    ? `${coloredText(seconds, color)} second${plural(seconds)}`
    : ''

  return `${hoursString}${minutesString}${secondsString}`
}
