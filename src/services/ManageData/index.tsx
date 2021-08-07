import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { endpoints, paths, localStorageKeys } from 'Constants'
import {
  buildCharacterData,
  filterItemData,
  checkAndHash,
  getPercentage,
} from './utils'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ManageDataClient {
  static serverDataUrl = `${endpoints.BASE_DATA}${paths.SERVER_DATA}`
  static characterDataUrl = `${endpoints.BASE_DATA}${paths.CHARACTER_DATA}`
  static rareItemDataUrl = `${endpoints.BASE_DATA}${paths.ITEMS_DATA}`
  static historyHashDataUrl = `${endpoints.BASE_HISTORY_DATA}${paths.HISTORY_HASH}`
  static statisticsDataUrl = `${endpoints.BASE_HISTORY_DATA}${paths.OVERALL_STATISTICS}`

  static async fetchServerData(): Promise<ServerObject[]> {
    try {
      const response = await fetch(this.serverDataUrl)
      const data = (await response.json()) as Record<string, ServerObject>
      const serverArray = Object.values(data)

      saveToLocalStorage(localStorageKeys.SERVER_DATA, serverArray)

      return serverArray
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<ServerObject[]>(
        localStorageKeys.SERVER_DATA,
        [],
      )
    }
  }

  static async fetchCharacterData(): Promise<PartialCharacterObject[]> {
    try {
      const response = await fetch(this.characterDataUrl)
      const data = (await response.json()) as MinifiedCharacterObject[]

      const builtCharacterData = buildCharacterData(data)
      saveToLocalStorage(
        localStorageKeys.AUCTION_CHARACTER_DATA,
        builtCharacterData,
      )

      return builtCharacterData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<PartialCharacterObject[]>(
        localStorageKeys.AUCTION_CHARACTER_DATA,
        [],
      )
    }
  }

  static async fetchItemData(): Promise<RareItemData> {
    try {
      const response = await fetch(this.rareItemDataUrl)
      const data = (await response.json()) as RareItemData
      const rareItemData = filterItemData(data)

      saveToLocalStorage(localStorageKeys.RARE_ITEM_DATA, rareItemData)

      return rareItemData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<RareItemData>(
        localStorageKeys.RARE_ITEM_DATA,
        {},
      )
    }
  }

  static async fetchHistoryData(
    setCurrentLoadProgress: (percentage: string) => void,
  ): Promise<PartialCharacterObject[]> {
    try {
      const response = await fetch(this.historyHashDataUrl)
      const data = (await response.json()) as number[]

      let historyData: PartialCharacterObject[] = []
      for (const [index, hash] of data.entries()) {
        // eslint-disable-next-line no-await-in-loop
        const dataPage = await checkAndHash(hash, index)
        historyData = [...historyData, ...dataPage]
        setCurrentLoadProgress(getPercentage(index, data.length))
      }

      return historyData.sort((a, b) => b.auctionEnd - a.auctionEnd)
    } catch (error: unknown) {
      console.log(error)
      return []
    }
  }

  static async fetchStatisticsData(): Promise<DistributionData> {
    try {
      const response = await fetch(this.statisticsDataUrl)
      const data = (await response.json()) as DistributionData

      saveToLocalStorage(localStorageKeys.STATISTICS_DATA, data)

      return data
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<DistributionData>(
        localStorageKeys.STATISTICS_DATA,
        {},
      )
    }
  }
}
