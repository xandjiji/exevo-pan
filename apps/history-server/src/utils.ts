import { coloredText, brackets } from 'logging'
import { isEmptyCharacter } from 'shared-utils/dist/isEmptyCharacter'

const timeColor = (ms: number) => {
  if (ms <= 2000) return 'success'
  if (ms <= 3500) return 'highlight'
  return 'fail'
}

export class Timer {
  constructor() {
    this.startTimestamp = +new Date()
  }

  private startTimestamp = 0

  elapsedTime = (): string => {
    const ms = +new Date() - this.startTimestamp
    return brackets(`${coloredText(ms, timeColor(ms))}ms`, 'control')
  }
}

export const getMedian = (array: number[]): number | undefined => {
  if (array.length === 0) return undefined
  if (array.length === 1) return array[0]

  const sortedArray = [...array].sort((a, b) => a - b)
  const even = !(array.length % 2)
  const middleIdx = Math.ceil(sortedArray.length / 2) - 1

  if (even) {
    return Math.round((sortedArray[middleIdx] + sortedArray[middleIdx + 1]) / 2)
  }

  return sortedArray[middleIdx]
}

const SECONDS_IN_A_YEAR = 31536000
const RECENT_THRESHOLD = Math.round(SECONDS_IN_A_YEAR)

export const canBeUsedForEstimations = () => {
  const currentTimestamp = Math.round(+new Date() / 1000)
  return ({ hasBeenBidded, auctionEnd, level, skills }: CharacterObject) => {
    if (!hasBeenBidded) return false
    if (currentTimestamp - auctionEnd > RECENT_THRESHOLD) return false
    if (isEmptyCharacter({ level, skills })) return false

    return true
  }
}
