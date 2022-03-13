export interface CharacterTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  caption: string
  characterList: GuildMemberStats[]
}
