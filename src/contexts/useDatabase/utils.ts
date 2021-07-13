/* eslint-disable complexity */
import { DatabaseContextState } from './types'

export const buildCharacterData = (
  characterData: PartialCharacterObject[],
  serverData: ServerObject[],
): CharacterObject[] =>
  characterData.map(character => ({
    ...character,
    serverData: serverData[character.serverId],
  }))

export const filterCharacters = (
  state: DatabaseContextState,
  filters: FilterState,
): CharacterObject[] => {
  const { baseCharacterData, rareItemData } = state

  const {
    nicknameFilter,
    vocation: vocationFilter,
    pvp: pvpFilter,
    battleye: battleyeFilter,
    location: locationFilter,
    serverSet: serverFilter,
    minLevel: minLevelFilter,
    maxLevel: maxLevelFilter,
    minSkill: minSkillFilter,
    skillKey: skillKeysFilter,
    itemSet: itemFilter,
    /* @ ToDo: fav char filter */
    /* fav, */
    rareNick: rareNickFilter,
    soulwarFilter,
    imbuementsSet: imbuementsFilter,
  } = filters

  const nicknameRegex = new RegExp(nicknameFilter, 'i')
  const auctionWithRareItemsSet = setupRareItemsAuctions(
    itemFilter,
    rareItemData,
  )

  /* @ ToDo: fav char filter */

  const filteredCharacters: CharacterObject[] = []
  for (const currentCharacter of baseCharacterData) {
    const {
      id: currentId,
      vocationId: currentVocation,
      serverData: currentServerData,
      level: currentLevel,
      skills: currentSkills,
      nickname: currentNickname,
      hasSoulwar: currentSoulwar,
      imbuements: currentImbuements,
    } = currentCharacter

    /* @ ToDo: is this necessary?? */
    /* if (!serverData[serverId]) continue; */

    if (!!nicknameFilter && !nicknameRegex.test(currentNickname)) continue

    if (currentLevel < minLevelFilter || currentLevel > maxLevelFilter) continue

    if (setDoesntHasValue(vocationFilter, currentVocation)) continue

    if (setDoesntHasValue(pvpFilter, currentServerData.pvpType.type)) continue
    if (setDoesntHasValue(battleyeFilter, currentServerData.battleye)) continue
    if (
      setDoesntHasValue(locationFilter, currentServerData.serverLocation.type)
    )
      continue
    if (setDoesntHasValue(serverFilter, currentServerData.serverName)) continue

    if (setDoesntHasAnyValue(imbuementsFilter, currentImbuements)) continue
    if (setDoesntHasValue(auctionWithRareItemsSet, currentId)) continue

    if (rareNickFilter && !isRareNickname(currentNickname)) continue
    if (soulwarFilter && currentSoulwar) continue

    if (skillKeysFilter.size) {
      let hasMinimumSkill = false
      for (const skillItem of Array.from(skillKeysFilter)) {
        if (currentSkills[skillItem] >= minSkillFilter) {
          hasMinimumSkill = true
          break
        }
      }
      if (!hasMinimumSkill) continue
    }

    filteredCharacters.push(currentCharacter)
  }

  return filteredCharacters
}

function setupRareItemsAuctions(
  itemNameSet: Set<string>,
  rareItemData: RareItemData,
): Set<number> {
  const auctionIdSet = new Set<number>([])

  for (const itemName of [...itemNameSet]) {
    for (const setItem of [...rareItemData[itemName]]) {
      auctionIdSet.add(setItem)
    }
  }

  return auctionIdSet
}

function setDoesntHasValue<T>(set: Set<T>, value: T): boolean {
  if (set.size && !set.has(value)) {
    return true
  } else {
    return false
  }
}

function setDoesntHasAnyValue<T>(set: Set<T>, valueArray: Array<T>): boolean {
  if (set.size === 0) return false

  const charImbuementSet = new Set(valueArray)

  for (const value of Array.from(set)) {
    if (!charImbuementSet.has(value)) return true
  }

  return false
}

/* @ ToDo: test if this is working */
const specialCharacters = /[äëïöüÿ'-.,]/i
const twoConsecutiveUppercase = /[A-Z][A-Z]/
function isRareNickname(nickname: string): boolean {
  if (nickname.length <= 3) return true
  if (specialCharacters.test(nickname)) return true
  if (twoConsecutiveUppercase.test(nickname)) return true

  return false
}
