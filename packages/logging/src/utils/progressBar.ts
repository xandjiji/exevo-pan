import { coloredText } from './coloredText'
import { brackets } from './brackets'
import { ColorKey } from '../types'

const MAX_WIDTH = 8
const BLOCKS = [' ', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█']
const TOTAL_STEPS = MAX_WIDTH * BLOCKS.length

export const progressBar = (
  percentage: number,
  color: ColorKey = 'highlight',
): string => {
  const progressCount = Math.floor(TOTAL_STEPS * percentage)

  const bars = []
  let progressLeft = progressCount
  while (bars.length < MAX_WIDTH) {
    for (let i = BLOCKS.length - 1; i >= 0; i -= 1) {
      const character = BLOCKS[i]
      if (progressLeft - i >= 0) {
        progressLeft -= i
        bars.push(character)
        break
      }
    }
  }

  return brackets(coloredText(bars.join(''), color), 'reset')
}
