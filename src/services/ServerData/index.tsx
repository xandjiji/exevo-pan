import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { BASE_DATA_ENDPOINT, SERVER_DATA_PATH } from '../../constants'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ServerDataClient {
  static baseUrl = `${BASE_DATA_ENDPOINT}${SERVER_DATA_PATH}`

  static async fetch(): Promise<ServerObject[]> {
    try {
      const response = await fetch(this.baseUrl)
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
