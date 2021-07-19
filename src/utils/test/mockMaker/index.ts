import { buildCharacterData } from 'contexts/useDatabase/utils'
import { randomServerData } from './serverMaker'
import { randomCharacterData } from './characterMaker'
import { randomItemData } from './rareItemMaker'
import { Dataset } from './types'

export const randomDataset = (): Dataset => {
  const { rawServerData, serverList } = randomServerData(100)
  const { minifiedCharacterData, characterList } = randomCharacterData(100)
  const { rawItemData, itemData } = randomItemData()

  const buildedCharacterData = buildCharacterData(characterList, serverList)

  return {
    rawServerData,
    serverData: serverList,
    minifiedCharacterData,
    characterData: buildedCharacterData,
    rawItemData,
    itemData,
  }
}
