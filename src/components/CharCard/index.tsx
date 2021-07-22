import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import { formatNumberWithCommas } from 'utils'
import {
  Title,
  Subtitle,
  ServerInfo,
  CharacterItems,
  CharacterSkills,
  CharacterImbuements,
} from './Parts'
import * as S from './styles'
import { CharCardProps } from './types'

const CharCard = ({ characterData, ...props }: CharCardProps): JSX.Element => {
  const {
    id,
    nickname,
    outfitId,
    level,
    vocationId,
    serverData,
    transfer,
    auctionEnd,
    hasBeenBidded,
    currentBid,
    items,
    skills,
    imbuements,
    charms,
  } = characterData

  const { pathname } = useLocation()

  const getBidLabelText = () => {
    if (pathname === '/bazaar-history') {
      return hasBeenBidded ? 'Auction Successful' : 'Auction Failed'
    } else {
      return hasBeenBidded ? 'Current Bid' : 'Minimum Bid'
    }
  }

  return (
    <S.Wrapper {...props}>
      <S.Head>
        <S.SpritePortrait
          src={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
          alt={nickname}
          title={nickname}
        />

        <S.HeadInfo>
          <Title characterId={id}>{nickname}</Title>
          <Subtitle level={level} vocation={vocationId} />
        </S.HeadInfo>

        <S.FavButton characterObject={characterData} />
      </S.Head>

      <S.InfoGrid>
        <ServerInfo
          serverData={serverData}
          nickname={nickname}
          transfer={transfer}
        />

        <S.LabeledTextBox labelText="PvP">
          <S.BattleyeStatus active={serverData.battleye} />
          {serverData.pvpType.string}
        </S.LabeledTextBox>

        <S.LabeledTextBox labelText="Auction End">
          <S.AuctionTimer endDate={new Date(auctionEnd * 1000)} />
        </S.LabeledTextBox>

        <S.LabeledTextBox labelText={getBidLabelText()}>
          <S.TibiaCoinIcon />
          {formatNumberWithCommas(currentBid)}
        </S.LabeledTextBox>
      </S.InfoGrid>

      <CharacterItems items={items} />

      <CharacterSkills skills={skills} />

      <S.Footer>
        <CharacterImbuements imbuements={imbuements} />

        {!!charms.length && (
          <S.CharmWrapper>
            {charms.map(charm => (
              <S.Charm key={charm}>{charm}</S.Charm>
            ))}
          </S.CharmWrapper>
        )}
      </S.Footer>
    </S.Wrapper>
  )
}

export default memo(CharCard)
export { default as CardSkeleton } from './Skeleton'
