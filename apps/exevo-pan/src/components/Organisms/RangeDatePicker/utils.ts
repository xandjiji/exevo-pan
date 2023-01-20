import { sanitizeDateTime } from 'utils'

export const getDatesUntilEnd = (
  unsanitizedEndingDate: Date,
  startingDate?: Date,
): Date[] => {
  const endingDate = sanitizeDateTime(unsanitizedEndingDate)

  const stepDate = sanitizeDateTime(startingDate ?? new Date())
  const datesInRange = [new Date(stepDate)]

  while (stepDate < endingDate) {
    stepDate.setDate(stepDate.getDate() + 1)
    datesInRange.push(new Date(stepDate))
  }

  return datesInRange
}

export const partitionByMonths = (dateArray: Date[]): Date[][] => {
  const monthsPartition = new Set<number>([])

  dateArray.forEach((date) => {
    const month = date.getMonth() + 1
    monthsPartition.add(month)
  })

  return [...monthsPartition].map((month) =>
    dateArray.filter((date) => {
      const thisMonth = date.getMonth() + 1

      return month === thisMonth
    }),
  )
}

export const fillWithDays = (
  initialDate: Date,
  amount: number,
  step: number,
): Date[] => {
  const stepDate = new Date(initialDate)

  return Array.from(
    { length: amount },
    () => new Date(stepDate.setDate(stepDate.getDate() + step)),
  ).sort((a, b) => +a - +b)
}
