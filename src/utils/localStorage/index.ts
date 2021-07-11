export function saveToLocalStorage<T>(key: string, data: T): void {
  const serializedData = JSON.stringify(data)
  localStorage.setItem(key, serializedData)
}

export function getFromLocalStorage<T>(key: string, fallbackObject: T): T {
  const serializedData = localStorage.getItem(key)

  if (!serializedData) return fallbackObject

  return JSON.parse(serializedData)
}

export const getFavArray = (): CharacterObject[] => {
  const favArray: CharacterObject[] = getFromLocalStorage(
    'initialFavCharacterData',
    [],
  )

  return favArray
}
