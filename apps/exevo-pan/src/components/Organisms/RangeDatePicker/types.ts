export type DayProps = {
  today?: boolean
} & JSX.IntrinsicElements['button']

export type RangeDatePickerProps = {
  startDate?: Date
  endDate: Date
  selectedDates: Date[]
  onDateSelect: (selectedDate: Date) => void
} & JSX.IntrinsicElements['div']
