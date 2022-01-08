/* eslint-disable no-console */
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { endpoints, paths, localStorageKeys } from 'Constants'
import { unminifyGuildData } from 'shared-utils/dist/unminifyGuildData'

export default class ManageDataClient {
  static warStatisticsDataUrl = `${endpoints.WAR_DATA}${paths.WAR_STATISTICS}`

  static async fetchWarStatisticsData(): Promise<WarStatistics> {
    try {
      const response = await fetch(this.warStatisticsDataUrl)
      const data = (await response.json()) as WarStatistics

      saveToLocalStorage(localStorageKeys.WAR_STATISTICS_DATA, data)

      return data
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<WarStatistics>(
        localStorageKeys.WAR_STATISTICS_DATA,
        {} as WarStatistics,
      )
    }
  }

  static async fetchGuildWarData(guildName: string): Promise<MemberWarData[]> {
    let path = paths.PUNE_DATA
    let guildLocalStorageKey = localStorageKeys.PUNE_GUILD_DATA
    let guildId = 0
    if (guildName === 'Bones Alliance') {
      path = paths.BONES_DATA
      guildLocalStorageKey = localStorageKeys.BONES_GUILD_DATA
      guildId = 1
    }

    try {
      const response = await fetch(`${endpoints.WAR_DATA}${path}`)
      const data = (await response.json()) as MiniMemberWarData[]
      const buildedData = unminifyGuildData(data, guildName, guildId)

      saveToLocalStorage(guildLocalStorageKey, buildedData)

      return buildedData
    } catch (error: unknown) {
      console.log(error)
      return getFromLocalStorage<MemberWarData[]>(
        guildLocalStorageKey,
        [] as MemberWarData[],
      )
    }
  }
}
