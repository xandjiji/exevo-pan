import { coloredText } from './coloredText'

export const coloredDiff = (diff: number): string => {
  if (diff > 0) {
    return coloredText(`+${diff}`, 'success')
  }

  if (diff < 0) {
    return coloredText(diff, 'fail')
  }

  return coloredText(diff, 'control')
}
