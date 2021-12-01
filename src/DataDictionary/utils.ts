export const dictionaryFactory = (keyArray: string[]): Dictionary => {
  const dictionaryObject: Dictionary = {}

  keyArray.forEach((value, index) => {
    dictionaryObject[index] = value
    dictionaryObject[value] = index
  })

  return dictionaryObject
}
