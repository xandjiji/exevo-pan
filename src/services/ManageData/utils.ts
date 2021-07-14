import { get, set } from 'idb-keyval'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { minifiedToObject } from 'utils/dataDictionary'
import { BASE_HISTORY_DATA_ENDPOINT } from '../../constants'

/* @ ToDo: fix unknown typing after creating minifiedToObject */

export const buildCharacterData = (
  initialCharacterData: MinifiedCharacterObject[],
): CharacterObject[] => {
  const setupedCharacterData: CharacterObject[] = initialCharacterData.map(
    minifiedToObject,
  ) as unknown as CharacterObject[]

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

const buildDB = async (
  index: number,
  data: MinifiedCharacterObject[],
): Promise<CharacterObject[]> => {
  const parsedDataArray = data.map(
    minifiedToObject,
  ) as unknown as CharacterObject[]
  const stringfiedData = JSON.stringify(data)

  await set(`historyData${index}`, stringfiedData)

  return parsedDataArray
}

const getFromDB = async (index: number): Promise<CharacterObject[]> => {
  const stringfiedData = (await get<string>(`historyData${index}`)) as string

  const parsedData = JSON.parse(stringfiedData) as MinifiedCharacterObject[]
  return parsedData.map(minifiedToObject) as unknown as CharacterObject[]
}

export const checkAndHash = async (
  hash: number,
  index: number,
): Promise<CharacterObject[]> => {
  const pageName = `historyHash${index}`
  const pageHash = getFromLocalStorage(pageName, 0)

  if (pageHash === hash) {
    const characterData = await getFromDB(index)
    return characterData
  } else {
    const response = await fetch(
      `${BASE_HISTORY_DATA_ENDPOINT}/historyData${index}.json`,
    )
    const data = (await response.json()) as MinifiedCharacterObject[]
    const parsedDataArray = await buildDB(index, data)

    saveToLocalStorage(pageName, hash)

    return parsedDataArray
  }
}
