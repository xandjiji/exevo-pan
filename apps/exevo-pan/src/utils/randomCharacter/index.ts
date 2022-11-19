export const randomCharacter = (): string => {
  const characters = [
    'Eternal Oblivion',
    'Cachero',
    'Bubble',
    'Setzer Gambler',
    'Arieswar',
    'Kharsek',
    "Lord'Paulistinha",
    'Mateusz Dragon Wielki',
  ]

  return characters[Math.floor(Math.random() * characters.length)]
}
