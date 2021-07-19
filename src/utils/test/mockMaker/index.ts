import { buildCharacterData } from 'contexts/useDatabase/utils'
import { randomServerData } from './serverMaker'
import { randomCharacterData } from './characterMaker'
import { randomItemData } from './rareItemMaker'
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
  }
}
