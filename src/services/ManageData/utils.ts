import { minifiedToObject } from 'utils/dataDictionary'

export const buildCharacterData = (
  initialCharacterData: MinifiedCharacterObject[],
): CharacterObject[] => {
  /* @ ToDo: fix unknown typing after creating minifiedToObject */
  const setupedCharacterData: CharacterObject[] = initialCharacterData.map(
    characterObject =>
      minifiedToObject(characterObject) as unknown as CharacterObject,
  )

  const currentDate = new Date()
  for (const characterObject of setupedCharacterData) {
    const characterAuctionEndDate = new Date(characterObject.auctionEnd * 1000)
    if (currentDate > characterAuctionEndDate) {
      setupedCharacterData.shift()
    } else {
      break
    }
  }

  return setupedCharacterData
}

export const filterItemData = (initialItemData: RareItemData): RareItemData => {
  const filteredItemData = {}

  for (const item in initialItemData) {
    if (initialItemData[item].length > 0) {
      filteredItemData[item] = initialItemData[item]
    }
  }

  return filteredItemData
}
