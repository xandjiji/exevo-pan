type GuildStats = {
  name: string
  kills: number
  diff: number
}

export interface ScoreboardProps extends React.HTMLAttributes<HTMLDivElement> {
  guildA: GuildStats
  guildB: GuildStats
}
