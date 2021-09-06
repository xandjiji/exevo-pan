export interface GuildSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildName: string
  href: string
  displayValue: string
  diff?: number
  label: string
  winning: boolean
}
