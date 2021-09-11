import { buildCharacterData } from 'contexts/useDatabase/utils'
import { unminifyGuildData } from 'services/ManageData/utils'
import { randomServerData } from './makers/serverMaker'
import { randomCharacterData } from './makers/characterMaker'
import { randomItemData } from './makers/rareItemMaker'
import { randomStatisticsData } from './makers/statisticsMaker'
import { randomWarStatisticsData } from './makers/warStatisticsMaker'
import { randomMembersWarData } from './makers/membersWarDataMaker'
import { Dataset } from './types'

export const randomDataset = (charAmount = 10000): Dataset => {
  const { rawServerData, serverList } = randomServerData(100)
  const { minifiedCharacterData, characterList } =
    randomCharacterData(charAmount)
  const { rawItemData, itemData } = randomItemData()

  const buildedCharacterData = buildCharacterData(characterList, serverList)

  return {
    rawServerData,
    serverData: serverList,
    minifiedCharacterData,
    partialCharacterData: characterList,
    characterData: buildedCharacterData,
    rawItemData,
    itemData,
    statisticsData: randomStatisticsData(),
    warStatistics: randomWarStatisticsData(),
    miniMembersWarData: randomMembersWarData(),
    puneMembersData: unminifyGuildData(
      randomMembersWarData(),
      'Libertabra Pune',
      0,
    ),
    bonesMembersData: unminifyGuildData(
      randomMembersWarData(),
      'Bones Alliance',
      1,
    ),
  }
}
