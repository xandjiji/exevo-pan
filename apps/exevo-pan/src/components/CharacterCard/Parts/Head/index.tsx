import { memo } from 'react'
import clsx from 'clsx'
import { vocation } from 'shared-utils/dist/vocations'
import CharacterMiniCard from '../../../CharacterMiniCard'
import { HeadProps } from './types'

export const HeadWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx('mb-4 flex items-start gap-[6px]', className)}
    {...props}
  />
)

const Head = ({
  highlighted = false,
  id,
  nickname,
  outfitId,
  level,
  vocationId,
  serverName,
  children,
}: HeadProps) => (
  <HeadWrapper>
    <CharacterMiniCard
      className="mr-auto"
      highlighted={highlighted}
      outfitSrc={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
      characterData={{
        name: nickname,
        level,
        vocation: vocation.getFullName(vocationId, level),
        world: serverName,
      }}
      linkUrl={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}`}
    />

    {children}
  </HeadWrapper>
)

export default memo(Head)
