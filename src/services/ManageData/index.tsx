import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import {
  BASE_DATA_ENDPOINT,
  SERVER_DATA_PATH,
  CHARACTER_DATA_PATH,
} from '../../constants'
import { setupCharacterData } from './utils'
import { ServerDataResponse, MinifiedCharacterObject } from './types'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ManageDataClient {
  static serverDataUrl = `${BASE_DATA_ENDPOINT}${SERVER_DATA_PATH}`
  static characterDataUrl = `${BASE_DATA_ENDPOINT}${CHARACTER_DATA_PATH}`

  static async fetchServerData(): Promise<ServerObject[]> {
    try {
      const response = await fetch(this.serverDataUrl)
      const data = (await response.json()) as ServerDataResponse
      const serverArray = Object.values(data)

      saveToLocalStorage('serverData', serverArray)

      return serverArray
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<ServerObject[]>('serverData', [])
    }
  }

  static async fetchCharacterData(): Promise<IncompleteCharacterObject[]> {
    try {
      const response = await fetch(this.characterDataUrl)
      const data = (await response.json()) as MinifiedCharacterObject[]

      const builtCharacterData = setupCharacterData(data)
      saveToLocalStorage('auctionCharacterData', builtCharacterData)

      return builtCharacterData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<IncompleteCharacterObject[]>(
        'auctionCharacterData',
        [],
      )
    }
  }
}
