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

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const formatDateLabel = (
  timestamp: number,
  formatType: 'Time' | 'Date',
): string => {
  const currentDate = new Date(timestamp)

  switch (formatType) {
    case 'Time': {
      const hours = currentDate.getHours().toString().padStart(2, '0')
      const minutes = currentDate.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}h`
    }

    case 'Date': {
      const day = currentDate.getDate().toString()
      const month = currentDate.getMonth() + 1
      const weekday = currentDate.getDay()

      return `${day}/${month}, ${weekdays[weekday]}`
    }

    default:
      return currentDate.toLocaleString()
  }
}
