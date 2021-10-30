import { randomDataset } from 'utils/test'

const { characterData } = randomDataset()
const randomCharacter = characterData[0]

const MILLISECONDS_IN_A_45_DAYS = 3888000000

export const mockedSelectedCharacter: CharacterObject = {
  ...randomCharacter,
  auctionEnd: (+new Date() + MILLISECONDS_IN_A_45_DAYS) / 1000,
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const currentMonthIndex = new Date().getMonth()
const nextMonthIndex = currentMonthIndex + 1 > 11 ? 0 : currentMonthIndex + 1

export const currentMonth = monthNames[currentMonthIndex]
export const nextMonth = monthNames[nextMonthIndex]
