export const buildCharacterData = (
  characterData: PartialCharacterObject[],
  serverData: ServerObject[],
): CharacterObject[] =>
  characterData.map(character => ({
    ...character,
    serverData: serverData[character.serverId],
  }))

/* export const filterCharacters = (
  baseCharacterData: CharacterObject[],
  filters: any,
): CharacterObject[] => {
  const {
    nicknameFilter,
    vocation,
    pvp,
    battleye,
    location,
    serverSet,
    minLevel,
    maxLevel,
    minSkill,
    skillKey,
    itemSet,
    fav,
    rareNick,
    soulwarFilter,
    imbuementsSet,
  } = filters

  const nicknameRegex = new RegExp(nicknameFilter, 'i')

  return []
}
 */
