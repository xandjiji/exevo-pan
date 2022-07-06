export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  children: React.ReactNode
  newSticker?: boolean
}
