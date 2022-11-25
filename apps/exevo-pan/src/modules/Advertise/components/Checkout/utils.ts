import { endpoints } from 'Constants'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const validateEmail = (email: string): boolean => emailRegex.test(email)

const buildUrl = (nickname: string): string =>
  `${endpoints.TIBIADATA}/${nickname}.json`

export const validateCharacter = async (nickname: string): Promise<boolean> => {
  try {
    return true
    /* @ ToDo: custom validation endpoint */
    const response = await fetch(buildUrl(nickname))
    const data = await response.json()
    return !data.characters.error
  } catch (error) {
    return true
  }
}
