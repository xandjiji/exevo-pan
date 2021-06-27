/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const saveToLocalStorage = (key: string, data: any): void => {
  const serializedData = JSON.stringify(data)
  localStorage.setItem(key, serializedData)
}

export const getFromLocalStorage = (key: string, fallbackObject: any): any => {
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
