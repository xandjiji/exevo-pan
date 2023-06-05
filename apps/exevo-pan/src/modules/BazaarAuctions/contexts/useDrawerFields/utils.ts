export const buildOption = (value: string): Option => ({ name: value, value })

export const sortOptions = (a: Option, b: Option) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()

  if (nameA < nameB) {
    return -1
  }

  if (nameA > nameB) {
    return 1
  }
  return 0
}
