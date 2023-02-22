import { memo } from 'react'
import { Hero } from 'templates'
import { avatar } from 'utils'
import { avatar as AVATAR } from 'Constants'
import type { Guild } from '@prisma/client'

/* @ ToDo: i18n */

type GuildHeroProps = {
  guild: Guild
  memberCount: number
}

const GuildHero = ({ guild, memberCount }: GuildHeroProps) => (
  <Hero
    offset
    title={guild.name}
    src={avatar.loadSrc(guild.avatarId)}
    hueRotation={guild.avatarDegree}
    dimension={guild.avatarId >= AVATAR.itemsBaseIndex ? 192 : undefined}
    subtitle={`${memberCount} members`}
  />
)

export default memo(GuildHero)
