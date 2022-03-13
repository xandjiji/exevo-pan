import { coloredText } from './coloredText'
import { ColorKey } from '../types'

export const coloredProgress = (
  [current, last]: [number, number],
  color: ColorKey = 'system',
): string =>
  `${coloredText('[', color)}${current}${coloredText(
    '/',
    color,
  )}${last}${coloredText(']', color)}`
