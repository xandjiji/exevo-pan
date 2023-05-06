import { isServer } from './isServer'

export function saveToLocalStorage<T>(key: string, data: T): void {
  if (!isServer()) {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  }
}

export function getFromLocalStorage<T>(key: string, fallbackObject: T): T {
  if (!isServer()) {
    try {
      const serializedData = localStorage.getItem(key)

      if (!serializedData) return fallbackObject

      return JSON.parse(serializedData)
    } catch {
      return fallbackObject
    }
  }

  return fallbackObject
}
