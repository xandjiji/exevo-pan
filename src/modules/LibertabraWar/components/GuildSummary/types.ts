export interface GuildSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildName: string
  href: string
  displayNumber: number
  diff: number
  label: string
  winning: boolean
}
