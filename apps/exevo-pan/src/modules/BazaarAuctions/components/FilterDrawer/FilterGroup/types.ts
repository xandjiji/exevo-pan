export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  children: JSX.Element | JSX.Element[]
  newSticker?: boolean
}
