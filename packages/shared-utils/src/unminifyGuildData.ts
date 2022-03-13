import { vocation } from './vocations'

const MINIMUM_MEMBER_LEVEL = 45

export const unminifyGuildData = (
  guildData: MiniMemberWarData[],
  guildName: string,
  guildId: number,
): MemberWarData[] =>
  guildData.map((member) => {
    const [nickname, vocationId, level, deathCount, kills] = member

    return {
      nickname,
      vocation: vocation.getFullName(vocationId, MINIMUM_MEMBER_LEVEL),
      vocationId,
      level,
      deathCount,
      kills,
      guild: guildName,
      guildId,
    }
  })
