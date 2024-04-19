/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import fs from 'fs'
import History from 'Data/History'
import { vocation as vocationUtil } from 'data-dictionary/dist/dictionaries/vocations'

type DataEntry = {
  year: number
  month: number
  vocation: 'knight' | 'paladin' | 'sorcerer' | 'druid'
  levelRange: number
  amount: number
  medianValue: number
}

const UTCMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const LAST_LEVEL_RANGE = 1500
const levelRanges: number[] = [
  500,
  600,
  700,
  800,
  900,
  1000,
  1100,
  1200,
  1300,
  1400,
  LAST_LEVEL_RANGE,
]

const getMedian = (array: number[]): number | undefined => {
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

const main = async () => {
  const helper = new History()
  await helper.load()

  const history = helper
    .getEntireHistory()
    .filter(({ level, hasBeenBidded }) => hasBeenBidded && level >= 500)
    .sort((a, b) => a.auctionEnd - b.auctionEnd)

  const knights = history.filter(
    ({ vocationId }) => vocationId === vocationUtil.VOCATION_IDS.KNIGHT,
  )
  const paladins = history.filter(
    ({ vocationId }) => vocationId === vocationUtil.VOCATION_IDS.PALADIN,
  )
  const sorcerers = history.filter(
    ({ vocationId }) => vocationId === vocationUtil.VOCATION_IDS.SORCERER,
  )
  const druids = history.filter(
    ({ vocationId }) => vocationId === vocationUtil.VOCATION_IDS.DRUID,
  )

  const firstDate = new Date(history[0].auctionEnd * 1000)
  const lastDate = new Date(history[history.length - 1].auctionEnd * 1000)

  const UTCYears: number[] = []
  const firstYear = firstDate.getUTCFullYear()
  const lastYear = lastDate.getUTCFullYear()
  for (let year = firstYear; year <= lastYear; year++) {
    UTCYears.push(year)
  }

  const fullData: DataEntry[] = []

  for (const year of UTCYears) {
    for (const month of UTCMonths) {
      for (const levelRange of levelRanges) {
        const getMedianData = (list: PartialCharacterObject[]) => {
          const filteredBids = list
            .filter(({ level, auctionEnd }) => {
              if (level < levelRange) return false
              if (
                levelRange !== LAST_LEVEL_RANGE &&
                level >= levelRange + 100
              ) {
                return false
              }

              const date = new Date(auctionEnd * 1000)
              return (
                date.getUTCFullYear() === year && date.getUTCMonth() === month
              )
            })
            .map(({ currentBid }) => currentBid)

          return {
            medianValue: getMedian(filteredBids) ?? 0,
            amount: filteredBids.length,
          }
        }

        fullData.push({
          year,
          month,
          vocation: 'knight',
          levelRange,
          ...getMedianData(knights),
        })
        fullData.push({
          year,
          month,
          vocation: 'paladin',
          levelRange,
          ...getMedianData(paladins),
        })
        fullData.push({
          year,
          month,
          vocation: 'sorcerer',
          levelRange,
          ...getMedianData(sorcerers),
        })
        fullData.push({
          year,
          month,
          vocation: 'druid',
          levelRange,
          ...getMedianData(druids),
        })
      }
    }
  }

  fs.writeFileSync('./character-value-data.json', JSON.stringify(fullData))
  fs.writeFileSync(
    './character-value-options.json',
    JSON.stringify({
      years: UTCYears,
      vocations: ['knight', 'paladin', 'sorcerer', 'druid'],
      levelRanges,
    }),
  )
}

main()
