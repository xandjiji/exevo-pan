import { coloredText, brackets } from '../utils'
import { ColorKey } from '../types'

const separator = coloredText(':', 'control')

export const now = (color: ColorKey = 'reset'): string => {
  const splitTimestamp = new Date()
    .toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    .split(':')
    .map((time) => coloredText(time, color))

  return brackets(splitTimestamp.join(separator), 'control')
}
