const padDate = (value: string | number): string =>
  value.toString().padStart(2, '0')

export const currentStringDate = (): string => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${padDate(day)}/${padDate(month)}/${year}`
}
