import { randomServerData } from './makers/serverMaker'
import { randomCharacter } from './makers/CharacterMaker'
import { randomItemData } from './makers/rareItemMaker'
import { randomStatisticsData } from './makers/statisticsMaker'
import { randomWarStatisticsData } from './makers/warStatisticsMaker'
import { randomGuildWarData } from './makers/membersWarDataMaker'
import { Dataset } from './types'

export const randomDataset = (charAmount = 10000): Dataset => {
  const { rawServerData, serverList } = randomServerData(100)
  const characterData = Array.from({ length: charAmount }, randomCharacter)

  const itemData = randomItemData()

  const guildWarData = randomGuildWarData()

  return {
    rawServerData,
    serverData: serverList,
    characterData,
    itemData,
    statisticsData: randomStatisticsData(),
    warStatistics: randomWarStatisticsData(),
    ...guildWarData,
  }
}
