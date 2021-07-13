export const buildCharacterData = (
  characterData: IncompleteCharacterObject[],
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
  return []
}
 */
