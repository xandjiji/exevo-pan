/* eslint-disable complexity */
import {
  setupRareItemsAuctions,
  setDoesntHasValue,
  setDoesntHasAnyValue,
  isRareNickname,
} from './utils'

export const filterCharacters = (
  baseCharacterData: CharacterObject[],
  rareItemData: RareItemData,
  filters: FilterState,
): CharacterObject[] => {
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
      serverId: currentServerId,
    } = currentCharacter

    /* @ ToDo: remove this once the database is fixed */
    if (currentServerId === -1) continue

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
