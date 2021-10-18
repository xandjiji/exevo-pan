import { endpoints } from 'Constants'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const validateEmail = (email: string): boolean => emailRegex.test(email)

const buildUrl = (nickname: string): string =>
  `${endpoints.TIBIADATA}/${nickname}.json`

export const validateCharacter = async (nickname: string): Promise<boolean> => {
  try {
    const response = await fetch(buildUrl(nickname))
    const data = await response.json()
    return !data.characters.error
  } catch (error) {
    return true
  }
}

export const randomCharacter = (): string => {
  const characters = [
    'Eternal Oblivion',
    'Cachero',
    'Bubble',
    'Setzer Gambler',
    'Arieswar',
    'Kharsek',
    "Lord'Paulistinha",
    '‎Mateusz Dragon Wielki',
  ]

  return characters[Math.floor(Math.random() * characters.length)]
}
