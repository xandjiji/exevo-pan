import { memo } from 'react'
import { avatar as AVATAR } from 'Constants'
import { avatar as avatarHelper } from 'utils'
import SpritePortrait from '../../Atoms/SpritePortrait'

type AvatarProps = {
  alt: string
  avatarId: number
  avatarDegree: number
  className?: string
}

const DIMENSIONS = {
  SMALL: 32,
  LARGE: 64,
}

const Avatar = ({ avatarId, avatarDegree, ...props }: AvatarProps) => {
  const isLarge = avatarId < AVATAR.itemsBaseIndex

  return (
    <SpritePortrait
      offset={isLarge}
      width={isLarge ? DIMENSIONS.LARGE : DIMENSIONS.SMALL}
      height={isLarge ? DIMENSIONS.LARGE : DIMENSIONS.SMALL}
      src={avatarHelper.loadSrc(avatarId)}
      imgStyle={{ filter: `hue-rotate(${avatarDegree}deg)` }}
      {...props}
    />
  )
}

export default memo(Avatar)
