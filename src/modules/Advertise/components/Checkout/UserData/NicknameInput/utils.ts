const buildUrl = (nickname: string): string =>
  `https://api.tibiadata.com/v2/characters/${nickname}.json`

export const isCharacterValid = async (nickname: string): Promise<boolean> => {
  const response = await fetch(buildUrl(nickname))
  const data = await response.json()
  return !data.characters.error
}
