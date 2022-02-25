import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef } from 'react'
import { useRouter } from 'next/router'
import { vocation as vocationHelper } from 'shared-utils/dist/vocations'
import { Checkbox } from 'components/Atoms'
import { formatNumberWithCommas } from 'utils'
import { routes } from 'Constants'
import useShouldRender from './useShouldRender'
import CharacterMiniCard from '../CharacterMiniCard'
import {
  ServerInfo,
  CharacterItems,
  CharacterSkills,
  ImbuementsTooltip,
  CharmsTooltip,
  QuestsTooltip,
  TagButton,
  SpecialTags,
} from './Parts'
import * as S from './styles'
import { CharacterCardProps } from './types'

const FIXED_BODY_HEIGHT = 375

const CharacterCard = ({
  characterData,
  highlighted = false,
  lazyRender = false,
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
    quests,
    charmInfo,
    preySlot,
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

  const ref = useRef<HTMLDivElement>()
  const shouldRenderBody = useShouldRender(lazyRender, ref)

  return (
    <S.Wrapper
      ref={ref as React.RefObject<HTMLDivElement>}
      highlighted={highlighted}
      {...props}
    >
      <S.Head highlighted={highlighted}>
        <CharacterMiniCard
          displayLink
          outfitSrc={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
          characterData={{
            name: nickname,
            level,
            vocation: vocationHelper.getFullName(vocationId, level),
            world: serverData.serverName,
          }}
          linkUrl={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}`}
        />

        {highlighted && <TagButton />}
      </S.Head>

      <S.Body style={{ height: FIXED_BODY_HEIGHT }}>
        {shouldRenderBody && (
          <>
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

            <S.FlexWrapper>
              <S.FlexColumn>
                <ImbuementsTooltip items={imbuements} />
                <CharmsTooltip items={charms} />
                <QuestsTooltip items={quests} />
              </S.FlexColumn>

              <S.FlexColumn>
                <S.Checkbox
                  aria-readonly
                  disabled
                  label="Charm Expansion"
                  checked={charmInfo.expansion}
                />

                <S.Checkbox
                  aria-readonly
                  disabled
                  label="Extra Prey Slot"
                  checked={preySlot}
                />

                <S.Checkbox
                  aria-readonly
                  disabled
                  label="Prey Slot"
                  checked={preySlot}
                />
              </S.FlexColumn>
            </S.FlexWrapper>
          </>
        )}
      </S.Body>

      <SpecialTags character={characterData} />
    </S.Wrapper>
  )
}

export default memo(CharacterCard)
export { default as CardSkeleton } from './Skeleton'
