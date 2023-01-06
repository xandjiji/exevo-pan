import { PopoverProps } from 'components/Atoms/Popover/types'

export type Item = {
  highlighted?: boolean
  icon?: (args: JSX.IntrinsicElements['svg']) => JSX.Element
  disabled?: boolean
  onSelect?: () => void
  keepOpenAfterSelection?: boolean
} & AccessibleLabelProps

export type ItemProps = {
  noIconPaddings?: boolean
} & Item &
  JSX.IntrinsicElements['button']

export type MenuProps = {
  titleElement?: React.ReactNode
  titleElementIconSpacing?: boolean
  items: Item[]
  variant?: 'icon' | 'button'
  children: React.ReactNode
} & Pick<PopoverProps, 'placement' | 'offset'> &
  JSX.IntrinsicElements['div']
