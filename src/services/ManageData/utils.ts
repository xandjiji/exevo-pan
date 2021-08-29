import { get, set } from 'idb-keyval'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { minifiedToObject } from 'utils/dataDictionary'
import { endpoints, localStorageKeys } from 'Constants'

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
  setupedCharacterData.some((characterObject) => {
    const characterAuctionEndDate = new Date(characterObject.auctionEnd * 1000)
    if (currentDate > characterAuctionEndDate) {
      mutatedSetupedCharacterData.shift()
      return false
    }
    return true
  })

  return mutatedSetupedCharacterData
}

export const filterItemData = (initialItemData: RareItemData): RareItemData => {
  const filteredItemData = {} as RareItemData

  Object.keys(initialItemData).forEach((item) => {
    if (initialItemData[item].length > 0) {
      filteredItemData[item] = initialItemData[item]
    }
  })

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

  await set(`${localStorageKeys.HISTORY_DATA_PREFIX}${index}`, stringfiedData)

  return parsedDataArray
}

const getFromDB = async (index: number): Promise<PartialCharacterObject[]> => {
  const stringfiedData = (await get<string>(
    `${localStorageKeys.HISTORY_DATA_PREFIX}${index}`,
  )) as string

  const parsedData = JSON.parse(stringfiedData) as MinifiedCharacterObject[]
  return parsedData.map(minifiedToObject) as unknown as PartialCharacterObject[]
}

export const checkAndHash = async (
  hash: number,
  index: number,
): Promise<PartialCharacterObject[]> => {
  const pageName = `${localStorageKeys.HISTORY_HASH_PREFIX}${index}`
  const pageHash = getFromLocalStorage(pageName, 0)

  if (pageHash === hash) {
    const characterData = await getFromDB(index)
    return characterData
  }
  const response = await fetch(
    `${endpoints.BASE_HISTORY_DATA}/${localStorageKeys.HISTORY_DATA_PREFIX}${index}.json`,
  )
  const data = (await response.json()) as MinifiedCharacterObject[]
  const parsedDataArray = await buildDB(index, data)

  saveToLocalStorage(pageName, hash)

  return parsedDataArray
}

export const getPercentage = (part: number, whole: number): string => {
  const percentage = Math.round((part / whole) * 100)
  return `${percentage}%`
}

const getVocationString = (vocationId: number): string => {
  if (vocationId === 1) return 'Elite Knight'
  if (vocationId === 2) return 'Royal Paladin'
  if (vocationId === 3) return 'Master Sorcerer'
  if (vocationId === 4) return 'Elder Druid'

  return 'None'
}

export const unminifyGuildData = (
  guildData: MiniGuildMember[],
  guildName: string,
  guildId: number,
): GuildMember[] =>
  guildData.map((member) => {
    const [nickname, vocationId, level, deathCount, kills] = member

    return {
      nickname,
      vocation: getVocationString(vocationId),
      vocationId,
      level,
      deathCount,
      kills,
      guild: guildName,
      guildId,
    }
  })
