export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  htmlFor?: string
  children: JSX.Element | JSX.Element[]
  newSticker?: boolean
}
