const formatReadableDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = date.getDate().toString()
  const month = (date.getMonth() + 1).toString()
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
}

export const sortAndFormatDates = (dates: string[]): string[] =>
  dates
    .map((dateString) => +new Date(dateString))
    .sort((a, b) => a - b)
    .map(formatReadableDate)
