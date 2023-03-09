import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Hero } from 'templates'
import { avatar } from 'utils'
import { avatar as AVATAR } from 'Constants'
import type { Guild } from '@prisma/client'

type GuildHeroProps = {
  guild: Guild
  memberCount: number
}

const GuildHero = ({ guild, memberCount }: GuildHeroProps) => {
  const {
    translations: { huntingGroups },
  } = useTranslations()

  const i18n = huntingGroups.GuildHero

  return (
    <Hero
      offset
      title={guild.name}
      src={avatar.loadSrc(guild.avatarId)}
      hueRotation={guild.avatarDegree}
      dimension={guild.avatarId >= AVATAR.itemsBaseIndex ? 192 : undefined}
      subtitle={`${memberCount} ${
        memberCount > 1 ? i18n.members : i18n.member
      }`}
    />
  )
}

export default memo(GuildHero)
