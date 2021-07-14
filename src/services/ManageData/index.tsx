import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import {
  BASE_DATA_ENDPOINT,
  SERVER_DATA_PATH,
  CHARACTER_DATA_PATH,
  ITEMS_DATA_PATH,
  HISTORY_HASH_PATH,
} from '../../constants'
import { buildCharacterData, filterItemData, checkAndHash } from './utils'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ManageDataClient {
  static serverDataUrl = `${BASE_DATA_ENDPOINT}${SERVER_DATA_PATH}`
  static characterDataUrl = `${BASE_DATA_ENDPOINT}${CHARACTER_DATA_PATH}`
  static rareItemDataUrl = `${BASE_DATA_ENDPOINT}${ITEMS_DATA_PATH}`
  static historyHashDataUrl = `${BASE_DATA_ENDPOINT}${HISTORY_HASH_PATH}`

  static async fetchServerData(): Promise<ServerObject[]> {
    try {
      const response = await fetch(this.serverDataUrl)
      const data = (await response.json()) as Record<string, ServerObject>
      const serverArray = Object.values(data)

      saveToLocalStorage('serverData', serverArray)

      return serverArray
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<ServerObject[]>('serverData', [])
    }
  }

  static async fetchCharacterData(): Promise<PartialCharacterObject[]> {
    try {
      const response = await fetch(this.characterDataUrl)
      const data = (await response.json()) as MinifiedCharacterObject[]

      const builtCharacterData = buildCharacterData(data)
      saveToLocalStorage('auctionCharacterData', builtCharacterData)

      return builtCharacterData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<PartialCharacterObject[]>(
        'auctionCharacterData',
        [],
      )
    }
  }

  static async fetchItemData(): Promise<RareItemData> {
    try {
      const response = await fetch(this.historyHashDataUrl)
      const data = (await response.json()) as RareItemData
      const rareItemData = filterItemData(data)

      saveToLocalStorage('rareItemData', rareItemData)

      return rareItemData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<RareItemData>('rareItemData', {})
    }
  }

  static async fetchHistoryData(): Promise<PartialCharacterObject[]> {
    try {
      const response = await fetch(this.historyHashDataUrl)
      const data = (await response.json()) as number[]

      let historyData: CharacterObject[] = []
      for (const [index, hash] of data.entries()) {
        // eslint-disable-next-line no-await-in-loop
        const dataPage = await checkAndHash(hash, index)
        historyData = [...historyData, ...dataPage]
        /* @ ToDo: add percentage alert to provider */
        /* setPercentage(getPercentage(index, data.length)) */
      }

      return historyData.sort((a, b) => b.auctionEnd - a.auctionEnd)
    } catch (error: unknown) {
      console.log(error)
      return []
    }
  }
}
