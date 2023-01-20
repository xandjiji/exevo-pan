export type DayProps = {
  today?: boolean
} & JSX.IntrinsicElements['button']

export type RangeDatePickerProps = {
  endDate: Date
  selectedDates: Date[]
  onDateSelect: (selectedDate: Date) => void
}
