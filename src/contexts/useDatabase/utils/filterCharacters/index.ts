import { getFavArray } from 'utils'
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
    fav: favFilter,
    rareNick: rareNickFilter,
    soulwarFilter,
    imbuementsSet: imbuementsFilter,
  } = filters

  const nicknameRegex = new RegExp(nicknameFilter, 'i')
  const auctionWithRareItemsSet = setupRareItemsAuctions(
    itemFilter,
    rareItemData,
  )

  let characterPool: CharacterObject[] = baseCharacterData
  if (favFilter) characterPool = getFavArray()

  const filteredCharacters: CharacterObject[] = []
  characterPool.forEach((currentCharacter) => {
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
    if (currentServerId === -1) return

    if (!!nicknameFilter && !nicknameRegex.test(currentNickname)) return

    if (currentLevel < minLevelFilter || currentLevel > maxLevelFilter) return

    if (setDoesntHasValue(vocationFilter, currentVocation)) return

    if (setDoesntHasValue(pvpFilter, currentServerData.pvpType.type)) return
    if (setDoesntHasValue(battleyeFilter, currentServerData.battleye)) return
    if (
      setDoesntHasValue(locationFilter, currentServerData.serverLocation.type)
    )
      return

    if (setDoesntHasValue(serverFilter, currentServerData.serverName)) return

    if (setDoesntHasAnyValue(imbuementsFilter, currentImbuements)) return
    if (setDoesntHasValue(auctionWithRareItemsSet, currentId)) return

    if (rareNickFilter && !isRareNickname(currentNickname)) return
    if (soulwarFilter && currentSoulwar) return

    if (skillKeysFilter.size) {
      let hasMinimumSkill = false
      Array.from(skillKeysFilter).some((skillItem) => {
        if (currentSkills[skillItem] >= minSkillFilter) {
          hasMinimumSkill = true
          return true
        }
        return false
      })
      if (!hasMinimumSkill) return
    }

    filteredCharacters.push(currentCharacter)
  })

  return filteredCharacters
}
