import { coloredText } from '../utils'
import { ColorKey } from '../types'

export const now = (color: ColorKey = 'reset'): string => {
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return coloredText(`[${timestamp}]`, color)
}
