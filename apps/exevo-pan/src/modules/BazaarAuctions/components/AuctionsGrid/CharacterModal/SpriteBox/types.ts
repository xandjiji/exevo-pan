export interface SpriteBoxProps {
  offset?: boolean
  name: string
  srcResolver: (name: string) => string
  rareSet?: Set<string>
}
