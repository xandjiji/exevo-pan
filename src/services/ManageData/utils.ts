const getVocationString = (vocationId: number): string => {
  if (vocationId === 1) return 'Elite Knight'
  if (vocationId === 2) return 'Royal Paladin'
  if (vocationId === 3) return 'Master Sorcerer'
  if (vocationId === 4) return 'Elder Druid'

  return 'None'
}

export const unminifyGuildData = (
  guildData: MiniMemberWarData[],
  guildName: string,
  guildId: number,
): MemberWarData[] =>
  guildData.map((member) => {
    const [nickname, vocationId, level, deathCount, kills] = member

    return {
      nickname,
      vocation: getVocationString(vocationId),
      vocationId,
      level,
      deathCount,
      kills,
      guild: guildName,
      guildId,
    }
  })
