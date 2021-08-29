declare type OnlineSnapshot = {
  count: number
  timeStamp: number
}

declare type GuildMemberStats = {
  nickname: string
  vocation: string
  level: number
  deathCount: number
  kills: number
}

declare type WarStatistics = {
  onlineCount: {
    guildA: OnlineSnapshot[]
    guildB: OnlineSnapshot[]
  }
  score: {
    guildA: number
    guildB: number
    diffGuildA: number
    diffGuildB: number
  }
  top10Kills: {
    guildA: GuildMemberStats[]
    guildB: GuildMemberStats[]
  }
  top10Deaths: {
    guildA: GuildMemberStats[]
    guildB: GuildMemberStats[]
  }
}
