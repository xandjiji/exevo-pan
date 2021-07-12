import { minifiedToObject } from 'utils/dataDictionary'
import { MinifiedCharacterObject } from './types'

export const setupCharacterData = (
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
