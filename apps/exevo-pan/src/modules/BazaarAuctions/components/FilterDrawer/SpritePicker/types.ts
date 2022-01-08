export type SpritePickerProps = {
  title: string
  spriteDirectory: string
  directorySuffix?: string
  filterKey: keyof FilterOptions
  options: string[]
  children?: React.ReactNode
}
