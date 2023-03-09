import { memo } from 'react'
import clsx from 'clsx'
import { avatar as AVATAR } from 'Constants'
import { avatar as avatarHelper } from 'utils'
import SpritePortrait from '../../Atoms/SpritePortrait'

type AvatarProps = {
  alt: string
  avatarId: number
  avatarDegree: number
  noBackground?: boolean
  className?: string
}

const DIMENSIONS = {
  SMALL: 32,
  LARGE: 64,
}

const Avatar = ({
  avatarId,
  avatarDegree,
  noBackground = false,
  className,
  ...props
}: AvatarProps) => {
  const isLarge = avatarId < AVATAR.itemsBaseIndex

  return (
    <SpritePortrait
      offset={isLarge}
      width={isLarge ? DIMENSIONS.LARGE : DIMENSIONS.SMALL}
      height={isLarge ? DIMENSIONS.LARGE : DIMENSIONS.SMALL}
      src={avatarHelper.loadSrc(avatarId)}
      imgStyle={{
        filter: `hue-rotate(${avatarDegree}deg) brightness(1.2)`,
        transition: 'ease-out 0.2s all',
        marginLeft: isLarge ? undefined : 4,
        marginTop: isLarge ? undefined : 4,
      }}
      className={clsx(
        className,
        noBackground && '!bg-transparent !shadow-none',
        'h-14 w-14',
      )}
      {...props}
    />
  )
}

export default memo(Avatar)
