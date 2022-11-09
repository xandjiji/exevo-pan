import { coloredText } from './coloredText'
import { ColorKey } from '../types'

export const brackets = (
  text: string | number,
  color = 'control' as ColorKey,
): string => `${coloredText('[', color)}${text}${coloredText(']', color)}`
