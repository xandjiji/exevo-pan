type ButtonProps = Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'>

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
  clickable?: boolean
  active?: boolean
} & ButtonProps &
  TagPropOptions
