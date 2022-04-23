type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'children'>
type DivProps = Omit<JSX.IntrinsicElements['div'], 'children'>

type CustomTag = {
  children: string
  tagColor: number
  tagId?: never
}

type TagId = {
  tagId: string
  children?: never
  tagColor?: never
}

type TagPropOptions = CustomTag | TagId

export type TagProps = {
  active?: boolean
} & TagPropOptions &
  (
    | ({ clickable: true } & ButtonProps)
    | ({ clickable: false | never } & DivProps)
  )
