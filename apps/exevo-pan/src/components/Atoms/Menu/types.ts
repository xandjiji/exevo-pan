export type Item = {
  highlighted?: boolean
  icon?: (args: JSX.IntrinsicElements['svg']) => JSX.Element
  disabled?: boolean
  onSelect?: () => void
} & AccessibleLabelProps

export type ItemProps = {
  noIconPaddings?: boolean
} & Item &
  JSX.IntrinsicElements['button']

export type MenuProps = {
  items: Item[]
  children: JSX.Element
} & JSX.IntrinsicElements['div']
