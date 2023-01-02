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
  titleElement?: React.ReactNode
  titleElementIconSpacing?: boolean
  items: Item[]
  children: React.ReactNode
} & JSX.IntrinsicElements['div']
