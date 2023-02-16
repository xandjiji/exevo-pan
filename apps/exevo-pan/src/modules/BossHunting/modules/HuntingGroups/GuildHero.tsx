import { memo } from 'react'
import { Hero } from 'templates'
import { avatar } from 'utils'
import { avatar as AVATAR } from 'Constants'
import type { Guild } from '@prisma/client'

const GuildHero = ({ name, avatarId, avatarDegree }: Guild) => (
  <Hero
    offset
    title={name}
    src={avatar.loadSrc(avatarId)}
    hueRotation={avatarDegree}
    dimension={avatarId >= AVATAR.itemsBaseIndex ? 192 : undefined}
  />
)

export default memo(GuildHero)
