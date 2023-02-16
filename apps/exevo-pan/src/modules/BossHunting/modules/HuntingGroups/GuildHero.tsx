import { memo } from 'react'
import { Hero } from 'templates'
import { avatar } from 'utils'
import { avatar as AVATAR } from 'Constants'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo: i18n */

const GuildHero = () => {
  const { guild, memberCount } = useGuildData()

  return (
    <Hero
      offset
      title={guild.name}
      src={avatar.loadSrc(guild.avatarId)}
      hueRotation={guild.avatarDegree}
      dimension={guild.avatarId >= AVATAR.itemsBaseIndex ? 192 : undefined}
      subtitle={`${memberCount} members`}
    />
  )
}

export default memo(GuildHero)
