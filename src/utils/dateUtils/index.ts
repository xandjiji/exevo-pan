declare type DateObject = {
  day: number
  month: number
  year: number
}

export const dateToDateObject = (dateValue: Date): DateObject => {
  const day = dateValue.getDate()
  const month = dateValue.getMonth() + 1
  const year = dateValue.getFullYear()

  return {
    day,
    month,
    year,
  }
}

export const readableCurrentDate = (): string => {
  const { day, month, year } = dateToDateObject(new Date())
  return `${day}/${month}/${year}`
}

export const standardCurrentDate = (): string => {
  const { day, month, year } = dateToDateObject(new Date())
  return `${month}/${day}/${year}`
}
