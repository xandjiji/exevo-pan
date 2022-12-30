export type Item = {
  content: React.ReactNode
  highlighted?: boolean
  icon?: (args: JSX.IntrinsicElements['svg']) => JSX.Element
  disabled?: boolean
}

export type ItemProps = Item & JSX.IntrinsicElements['button']

export type MenuProps = {
  items: Item[]
} & JSX.IntrinsicElements['div']
