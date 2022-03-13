export const buildCharacterData = (
  characterData: PartialCharacterObject[],
  serverData: ServerObject[],
): CharacterObject[] =>
  characterData.map((character) => ({
    ...character,
    serverData: serverData[character.serverId],
  }))
