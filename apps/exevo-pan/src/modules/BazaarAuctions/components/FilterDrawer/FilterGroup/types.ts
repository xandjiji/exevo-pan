export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  labelSuffix?: React.ReactNode
  htmlFor?: string
  children: React.ReactNode
  newSticker?: boolean
}
