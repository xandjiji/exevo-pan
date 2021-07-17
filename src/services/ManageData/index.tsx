import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import {
  BASE_DATA_ENDPOINT,
  BASE_HISTORY_DATA_ENDPOINT,
  SERVER_DATA_PATH,
  CHARACTER_DATA_PATH,
  ITEMS_DATA_PATH,
  HISTORY_HASH_PATH,
  SERVER_DATA_KEY,
  AUCTION_CHARACTER_DATA_KEY,
  RARE_ITEM_DATA_KEY,
} from 'Constants'
import {
  buildCharacterData,
  filterItemData,
  checkAndHash,
  getPercentage,
} from './utils'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ManageDataClient {
  static serverDataUrl = `${BASE_DATA_ENDPOINT}${SERVER_DATA_PATH}`
  static characterDataUrl = `${BASE_DATA_ENDPOINT}${CHARACTER_DATA_PATH}`
  static rareItemDataUrl = `${BASE_DATA_ENDPOINT}${ITEMS_DATA_PATH}`
  static historyHashDataUrl = `${BASE_HISTORY_DATA_ENDPOINT}${HISTORY_HASH_PATH}`

  static async fetchServerData(): Promise<ServerObject[]> {
    try {
      const response = await fetch(this.serverDataUrl)
      const data = (await response.json()) as Record<string, ServerObject>
      const serverArray = Object.values(data)

      saveToLocalStorage(SERVER_DATA_KEY, serverArray)

      return serverArray
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<ServerObject[]>(SERVER_DATA_KEY, [])
    }
  }

  static async fetchCharacterData(): Promise<PartialCharacterObject[]> {
    try {
      const response = await fetch(this.characterDataUrl)
      const data = (await response.json()) as MinifiedCharacterObject[]

      const builtCharacterData = buildCharacterData(data)
      saveToLocalStorage(AUCTION_CHARACTER_DATA_KEY, builtCharacterData)

      return builtCharacterData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<PartialCharacterObject[]>(
        AUCTION_CHARACTER_DATA_KEY,
        [],
      )
    }
  }

  static async fetchItemData(): Promise<RareItemData> {
    try {
      const response = await fetch(this.rareItemDataUrl)
      const data = (await response.json()) as RareItemData
      const rareItemData = filterItemData(data)

      saveToLocalStorage(RARE_ITEM_DATA_KEY, rareItemData)

      return rareItemData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<RareItemData>(RARE_ITEM_DATA_KEY, {})
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
}
