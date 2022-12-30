export type Item = {
  content: React.ReactNode
  highlighted?: boolean
  icon?: (args: JSX.IntrinsicElements['svg']) => JSX.Element
  disabled?: boolean
  // onSelect
}

export type ItemProps = {
  noIconPaddings?: boolean
} & Item &
  JSX.IntrinsicElements['button']

export type MenuProps = {
  items: Item[]
  // highlightedIndex
  // open
  // onClose
} & JSX.IntrinsicElements['div']
