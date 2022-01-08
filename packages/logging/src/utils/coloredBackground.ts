import { bgColors, BGColorKey } from '../types'

export const coloredBackground = (
  text: string | number,
  color: BGColorKey,
): string => `${bgColors[color]}${text}${bgColors.reset}`
