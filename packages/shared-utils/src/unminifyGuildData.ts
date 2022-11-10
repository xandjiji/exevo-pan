import { vocation } from 'data-dictionary/dist/dictionaries/vocations'

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
      vocation: vocation.getPromotedName({
        vocationId,
        level: MINIMUM_MEMBER_LEVEL,
      }),
      vocationId,
      level,
      deathCount,
      kills,
      guild: guildName,
      guildId,
    }
  })
