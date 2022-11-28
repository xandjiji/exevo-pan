export type CharacterCardProps = {
  characterData: CharacterObject
  highlighted?: boolean
  lazyRender?: boolean
  expandable?: boolean
  past?: boolean
  permalink?: string
} & JSX.IntrinsicElements['article']

export type WrapperProps = Pick<CharacterCardProps, 'highlighted'> &
  JSX.IntrinsicElements['article']

export type FlexColumnProps = {
  storeColumn?: boolean
} & JSX.IntrinsicElements['div']

export type BodyProps = {
  lazy?: boolean
} & JSX.IntrinsicElements['div']

export type TCInvestedState = 'INVESTED' | 'NO_TC' | 'HIDDEN'
