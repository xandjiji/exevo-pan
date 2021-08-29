export interface GuildSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildName: string
  href: string
  totalKills: number
  diff: number
  winning: boolean
}
