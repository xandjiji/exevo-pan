export function saveToLocalStorage<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  }
}

export function getFromLocalStorage<T>(key: string, fallbackObject: T): T {
  if (typeof window !== 'undefined') {
    const serializedData = localStorage.getItem(key)

    if (!serializedData) return fallbackObject

    return JSON.parse(serializedData)
  }

  return fallbackObject
}
