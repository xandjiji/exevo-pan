import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { BASE_DATA_ENDPOINT, SERVER_DATA_PATH } from '../../constants'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ManageDataClient {
  static serverUrl = `${BASE_DATA_ENDPOINT}${SERVER_DATA_PATH}`

  static async fetchServerData(): Promise<ServerObject[]> {
    try {
      const response = await fetch(this.serverUrl)
      const data = (await response.json()) as Record<string, ServerObject>
      const serverArray = Object.values(data)

      saveToLocalStorage('serverData', serverArray)

      return serverArray
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<ServerObject[]>('serverData', [])
    }
  }
}
