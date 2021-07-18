import { get, set } from 'idb-keyval'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { minifiedToObject } from 'utils/dataDictionary'
import {
  BASE_HISTORY_DATA_ENDPOINT,
  HISTORY_HASH_KEY_PREFIX,
  HISTORY_DATA_KEY_PREFIX,
} from 'Constants'

/* @ ToDo: fix unknown typing after creating minifiedToObject */

export const buildCharacterData = (
  initialCharacterData: MinifiedCharacterObject[],
): PartialCharacterObject[] => {
  const setupedCharacterData: PartialCharacterObject[] =
    initialCharacterData.map(
      minifiedToObject,
    ) as unknown as PartialCharacterObject[]

  const mutatedSetupedCharacterData = [...setupedCharacterData]

  const currentDate = new Date()
  for (const characterObject of setupedCharacterData) {
    const characterAuctionEndDate = new Date(characterObject.auctionEnd * 1000)
    if (currentDate > characterAuctionEndDate) {
      mutatedSetupedCharacterData.shift()
    } else {
      break
    }
  }

  return mutatedSetupedCharacterData
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
): Promise<PartialCharacterObject[]> => {
  const parsedDataArray = data.map(
    minifiedToObject,
  ) as unknown as CharacterObject[]
  const stringfiedData = JSON.stringify(data)

  await set(`${HISTORY_DATA_KEY_PREFIX}${index}`, stringfiedData)

  return parsedDataArray
}

const getFromDB = async (index: number): Promise<PartialCharacterObject[]> => {
  const stringfiedData = (await get<string>(
    `${HISTORY_DATA_KEY_PREFIX}${index}`,
  )) as string

  const parsedData = JSON.parse(stringfiedData) as MinifiedCharacterObject[]
  return parsedData.map(minifiedToObject) as unknown as PartialCharacterObject[]
}

export const checkAndHash = async (
  hash: number,
  index: number,
): Promise<PartialCharacterObject[]> => {
  const pageName = `${HISTORY_HASH_KEY_PREFIX}${index}`
  const pageHash = getFromLocalStorage(pageName, 0)

  if (pageHash === hash) {
    const characterData = await getFromDB(index)
    return characterData
  } else {
    const response = await fetch(
      `${BASE_HISTORY_DATA_ENDPOINT}/${HISTORY_DATA_KEY_PREFIX}${index}.json`,
    )
    const data = (await response.json()) as MinifiedCharacterObject[]
    const parsedDataArray = await buildDB(index, data)

    saveToLocalStorage(pageName, hash)

    return parsedDataArray
  }
}

export const getPercentage = (part: number, whole: number): string => {
  const percentage = Math.round((part / whole) * 100)
  return `${percentage}%`
}
