type GuildStats = {
  name: string
  todayDiff: number
  lastDiff: number
  href: string
}

export interface ScoreboardXPProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildA: GuildStats
  guildB: GuildStats
}
