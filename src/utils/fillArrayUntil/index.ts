export function fillArrayUntil<T>(array: T[], size: number): T[] {
  const newArray = [...array]
  while (newArray.length < size) {
    newArray.unshift(newArray[0])
  }

  return newArray
}
