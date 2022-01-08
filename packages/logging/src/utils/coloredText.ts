import { colors, ColorKey } from '../types'

export const coloredText = (text: string | number, color: ColorKey): string =>
  `${colors[color]}${text}${colors.reset}`
