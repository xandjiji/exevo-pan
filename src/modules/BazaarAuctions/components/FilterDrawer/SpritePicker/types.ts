export type SpritePickerProps = {
  title: string
  spriteDirectory: string
  directorySuffix?: string
  filterKey: keyof FilterState
  options: string[]
  children?: React.ReactNode
}
