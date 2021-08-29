export interface GuildSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildName: string
  totalKills: number
  diff: number
  winning: boolean
}
