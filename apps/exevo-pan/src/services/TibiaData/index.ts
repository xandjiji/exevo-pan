/* eslint-disable no-console */
import { endpoints } from 'Constants'
import { QueryResult } from './types'

const EXTENSION = '.json'

export default class TibiaDataClient {
  private static baseUrl = endpoints.TIBIADATA

  static async character(
    nickname: string,
  ): Promise<SingleCharacterData | false> {
    try {
      const response = await fetch(`${this.baseUrl}/${nickname}${EXTENSION}`)

      const { characters }: QueryResult = await response.json()

      const { error, data } = characters

      if (error) return false

      return data
    } catch {
      return false
    }
  }
}
