import { randomDataset } from 'utils/test'

const {
  partialCharacterData,
  serverData,
  itemData,
  characterData,
  statisticsData,
  puneMembersData,
  bonesMembersData,
  allGuildMembers,
} = randomDataset()

export const mockedPartialCharacterData = partialCharacterData
export const mockedServerData = serverData
export const mockedItemData = itemData
export const mockStatisticsData = statisticsData
export const mockedCharacterData = characterData

export const initialFilter = {
  nicknameFilter: '',
  vocation: new Set([]),
  pvp: new Set([]),
  battleye: new Set([]),
  location: new Set([]),
  serverSet: new Set([]),
  minLevel: 8,
  maxLevel: 2000,
  minSkill: 10,
  skillKey: new Set([]),
  itemSet: new Set([]),
  fav: false,
  rareNick: false,
  soulwarFilter: false,
  imbuementsSet: new Set([]),
} as FilterState

const favEK: CharacterObject = { ...characterData[0], vocationId: 1 }
const favED: CharacterObject = { ...characterData[1], vocationId: 4 }

export const mockFavArray = [favEK, favED] as CharacterObject[]
export const filteredFavArray = [favEK] as CharacterObject[]

export const mockedGuildData = {
  puneMembersData,
  bonesMembersData,
  allGuildMembers,
}
