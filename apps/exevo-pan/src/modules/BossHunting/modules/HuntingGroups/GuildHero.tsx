import { memo } from 'react'
import { Hero } from 'templates'
import { avatar } from 'utils'
import { avatar as AVATAR } from 'Constants'
import type { Guild } from '@prisma/client'

/* @ ToDo: i18n */

const GuildHero = ({
  name,
  avatarId,
  avatarDegree,
  memberCount,
}: Guild & { memberCount: number }) => (
  <Hero
    offset
    title={name}
    src={avatar.loadSrc(avatarId)}
    hueRotation={avatarDegree}
    dimension={avatarId >= AVATAR.itemsBaseIndex ? 192 : undefined}
    subtitle={`${memberCount} members`}
  />
)

export default memo(GuildHero)
