import { memo } from 'react'
import clsx from 'clsx'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { officialAuctionUrl } from 'utils'
import CharacterMiniCard from '../../../CharacterMiniCard'
import { HeadProps } from './types'

export const HeadWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div className={clsx('mb-4 flex items-start gap-3', className)} {...props} />
)

const Head = ({
  highlighted = false,
  id,
  nickname,
  outfitId,
  level,
  vocationId,
  serverName,
  permalink,
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
        vocation: vocation.getPromotedName({ vocationId, level }),
        world: serverName,
      }}
      linkUrl={officialAuctionUrl(id)}
      permalink={permalink}
    />

    {children}
  </HeadWrapper>
)

export default memo(Head)
