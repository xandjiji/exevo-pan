import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import { formatNumberWithCommas, calculateTotalInvestment } from 'utils'
import { routes } from 'Constants'
import useShouldRender from './useShouldRender'
import {
  Head,
  Textbox,
  CharacterItems,
  CharacterSkills,
  ImbuementsTooltip,
  CharmsTooltip,
  QuestsTooltip,
  SpecialTags,
} from './Parts'
import * as S from './styles'
import { CharacterCardProps } from './types'

const FIXED_BODY_HEIGHT = 367

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

  const bidLabelText = useMemo(() => {
    if (pathname === routes.BAZAAR_HISTORY) {
      return hasBeenBidded
        ? common.CharacterCard.bidLabelText.auctionSuccessful
        : common.CharacterCard.bidLabelText.auctionFailed
    }
    return hasBeenBidded
      ? common.CharacterCard.bidLabelText.currentBid
      : common.CharacterCard.bidLabelText.minimumBid
  }, [pathname, hasBeenBidded, common])

  const tcInvested = useMemo(
    () => formatNumberWithCommas(calculateTotalInvestment(characterData)),
    [characterData],
  )

  const ref = useRef<HTMLDivElement>()
  const shouldRenderBody = useShouldRender(lazyRender, ref)

  return (
    <S.Wrapper
      ref={ref as React.RefObject<HTMLDivElement>}
      data-highlighted={highlighted}
      {...props}
    >
      <Head
        highlighted={highlighted}
        id={id}
        outfitId={outfitId}
        nickname={nickname}
        level={level}
        vocationId={vocationId}
        serverName={serverData.serverName}
      />

      <S.Body style={{ height: FIXED_BODY_HEIGHT }}>
        {shouldRenderBody && (
          <>
            <S.InfoGrid>
              <Textbox.Server
                serverData={serverData}
                nickname={nickname}
                transfer={transfer}
              />

              <Textbox.Pvp serverData={serverData} />

              <S.LabeledTextBox labelText={common.CharacterCard.auctionEnd}>
                <S.AuctionTimer endDate={new Date(auctionEnd * 1000)} />
              </S.LabeledTextBox>

              <S.LabeledTextBox labelText={bidLabelText}>
                <S.TibiaCoinIcon />
                {formatNumberWithCommas(currentBid)}
              </S.LabeledTextBox>
            </S.InfoGrid>

            <CharacterItems items={items} />

            <CharacterSkills skills={skills} />

            <S.FlexFooter>
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
                  label="Prey Slot"
                  checked={preySlot}
                />

                <S.FlexWrapper
                  title={`${common.CharacterCard.tcInvested.prefix} ${tcInvested} ${common.CharacterCard.tcInvested.suffix}`}
                >
                  <S.CheckboxContainer>
                    <S.TibiaCoinIcon />
                  </S.CheckboxContainer>
                  <S.Strong data-has-investment={tcInvested !== '0'}>
                    {tcInvested} {common.CharacterCard.tcInvested.invested}
                  </S.Strong>
                </S.FlexWrapper>
              </S.FlexColumn>
            </S.FlexFooter>
          </>
        )}
      </S.Body>

      <SpecialTags character={characterData} />
    </S.Wrapper>
  )
}

export default memo(CharacterCard)
export { default as CardSkeleton } from './Skeleton'
