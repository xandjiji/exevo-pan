import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { useRouter } from 'next/router'
import { formatNumberWithCommas } from 'utils'
import { routes } from 'Constants'
import {
  Title,
  Subtitle,
  ServerInfo,
  CharacterItems,
  CharacterSkills,
  CharacterImbuements,
} from './Parts'
import * as S from './styles'
import { CharacterCardProps } from './types'

const CharacterCard = ({
  characterData,
  ...props
}: CharacterCardProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

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

  const { pathname } = useRouter()

  const getBidLabelText = () => {
    if (pathname === routes.BAZAAR_HISTORY) {
      return hasBeenBidded
        ? common.CharacterCard.bidLabelText.auctionSuccessful
        : common.CharacterCard.bidLabelText.auctionFailed
    }
    return hasBeenBidded
      ? common.CharacterCard.bidLabelText.currentBid
      : common.CharacterCard.bidLabelText.minimumBid
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

        <S.LabeledTextBox labelText={common.CharacterCard.auctionEnd}>
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
            {charms.map((charm) => (
              <S.Charm key={charm}>{charm}</S.Charm>
            ))}
          </S.CharmWrapper>
        )}
      </S.Footer>
    </S.Wrapper>
  )
}

export default memo(CharacterCard)
export { default as CardSkeleton } from './Skeleton'
