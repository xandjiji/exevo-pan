import { getFavArray } from 'utils'

export const isIdFavorited = (checkingId: number): boolean => {
  const favCharacters = getFavArray()
  return favCharacters.some((char) => char.id === checkingId)
}
