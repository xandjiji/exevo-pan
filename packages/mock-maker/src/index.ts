import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import { randomServerData } from './makers/serverMaker'
import { randomCharacter } from './makers/CharacterMaker'
import { randomItemData } from './makers/rareItemMaker'
import { randomStatisticsData } from './makers/statisticsMaker'
import { randomWarStatisticsData } from './makers/warStatisticsMaker'
import { randomGuildWarData } from './makers/membersWarDataMaker'
import { Dataset } from './types'

export const randomDataset = (charAmount = 10000): Dataset => {
  const { rawServerData, serverList } = randomServerData(100)
  const characterList = Array.from({ length: charAmount }, randomCharacter)

  const buildedCharacterData = buildCharacterData(characterList, serverList)
  const itemData = randomItemData(buildedCharacterData)

  const guildWarData = randomGuildWarData()

  return {
    rawServerData,
    serverData: serverList,
    partialCharacterData: characterList,
    characterData: buildedCharacterData,
    itemData,
    statisticsData: randomStatisticsData(),
    warStatistics: randomWarStatisticsData(),
    ...guildWarData,
  }
}
