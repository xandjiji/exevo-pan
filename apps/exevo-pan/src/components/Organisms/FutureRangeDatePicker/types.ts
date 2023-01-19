export type DayProps = {
  today?: boolean
} & JSX.IntrinsicElements['button']

export type FutureRangeDatePickerProps = {
  endDate: Date
  selectedDates: Date[]
  onDateSelect: (selectedDate: Date) => void
}
