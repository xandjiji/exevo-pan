declare type OnlineSnapshot = {
  count: number
  timeStamp: number
}

declare type WarGuildMember = {
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
  }
  top10Kills: {
    guildA: WarGuildMember[]
    guildB: WarGuildMember[]
  }
  top10Deaths: {
    guildA: WarGuildMember[]
    guildB: WarGuildMember[]
  }
}
