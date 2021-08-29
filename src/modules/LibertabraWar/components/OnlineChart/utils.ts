export const monthStr = [
  'Jan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Set',
  'Oct',
  'Nov',
  'Dec',
]

export const formatDateLabel = (timestamp: number): string => {
  const currentDate = new Date(timestamp)

  const hours = currentDate.getHours().toString().padStart(2, '0')
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}h`
}
