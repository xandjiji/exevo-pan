/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import fs from 'fs/promises'
import { broadcast, coloredText, coloredDiff } from 'logging'
import { file } from 'Constants'
import { countObjectDiff } from 'utils'
import { EMPTY_STATISTICS } from './schema'

const FILE_PATH = file.HISTORY_STATISTICS.path
const FILE_NAME = coloredText(file.HISTORY_STATISTICS.name, 'highlight')

export default class HistoryStatisticsData {
  private statisticsData = {} as StatisticsData

  async load(): Promise<void> {
    broadcast(`Loading ${FILE_NAME}...`, 'system')

    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8')
      this.statisticsData = JSON.parse(data)
    } catch {
      broadcast(
        `Failed to load ${FILE_NAME}, initializing a new one...`,
        'fail',
      )

      this.statisticsData = EMPTY_STATISTICS
      await fs.writeFile(FILE_PATH, JSON.stringify(EMPTY_STATISTICS))
    }
  }

  public async save(): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(this.statisticsData))
    broadcast(`Updated statistics were saved to ${FILE_NAME}`, 'success')
  }

  public patchData(newValues: Partial<StatisticsData>): void {
    const previousData = { ...this.statisticsData }

    this.statisticsData = {
      ...this.statisticsData,
      ...newValues,
    }

    const characterInfoKeys: Array<keyof StatisticsData> = [
      'top10Axe',
      'top10Bid',
      'top10Club',
      'top10Distance',
      'top10Fishing',
      'top10Fist',
      'top10Level',
      'top10Magic',
      'top10Shielding',
      'top10Sword',
    ]

    const numberValueInfoKeys: Array<keyof StatisticsData> = ['successRate']

    const monthlySummaryKeys: Array<keyof StatisticsData> = [
      'totalRevenue',
      'totalTibiaCoins',
    ]

    for (const [untypedKey, value] of Object.entries(newValues)) {
      const key = untypedKey as keyof StatisticsData

      if (characterInfoKeys.includes(key)) {
        const updatedCount = countObjectDiff(previousData[key], value)
        if (updatedCount > 0) {
          broadcast(
            `Patched ${coloredText(key, 'neutral')} values (${coloredDiff(
              updatedCount,
            )} entries diff)`,
            'neutral',
          )
        }
        continue
      }

      if (numberValueInfoKeys.includes(key)) {
        const previousValue = previousData[key] as number
        const valueDiff = (value as number) - previousValue
        broadcast(
          `Patched ${coloredText(key, 'neutral')} value (${coloredDiff(
            valueDiff,
          )} value diff)`,
          'neutral',
        )
        continue
      }

      if (monthlySummaryKeys.includes(key)) {
        const { lastMonth } = value as MonthlySummary
        const [today, yesterday] = [...lastMonth].reverse()
        const valueDiff = today - yesterday
        broadcast(
          `Patched ${coloredText(key, 'neutral')} value (${coloredDiff(
            valueDiff,
          )} value diff)`,
          'neutral',
        )
        continue
      }
    }
  }
}
