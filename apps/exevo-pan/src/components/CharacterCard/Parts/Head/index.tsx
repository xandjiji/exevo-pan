import { memo } from 'react'
import { vocation } from 'shared-utils/dist/vocations'
import CharacterMiniCard from '../../../CharacterMiniCard'
import * as S from './styles'
import { HeadProps } from './types'

const Head = ({
  highlighted = false,
  id,
  nickname,
  outfitId,
  level,
  vocationId,
  serverName,
  children,
}: HeadProps): JSX.Element => (
  <S.Head data-highlighted={highlighted}>
    <CharacterMiniCard
      displayLink
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
  </S.Head>
)

export default memo(Head)
