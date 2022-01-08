export interface GuildSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildName: string
  href: string
  displayValue: string
  diffText?: string
  label: string
  winning: boolean
}
