import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef, useMemo } from 'react'
import { formatNumberWithCommas, calculateTotalInvestment } from 'utils'
import useShouldRender from './useShouldRender'
import {
  Head,
  TagButton,
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
        id={id}
        outfitId={outfitId}
        nickname={nickname}
        level={level}
        vocationId={vocationId}
        serverName={serverData.serverName}
      >
        {highlighted && <TagButton />}
        <S.Button type="button">
          <S.Icons.Expand />
        </S.Button>
      </Head>

      <S.Body
        style={{ height: shouldRenderBody ? undefined : FIXED_BODY_HEIGHT }}
      >
        {shouldRenderBody && (
          <>
            <S.InfoGrid>
              <Textbox.Server
                serverData={serverData}
                nickname={nickname}
                transfer={transfer}
              />
              <Textbox.Pvp serverData={serverData} />
              <Textbox.AuctionEnd auctionEnd={auctionEnd} />
              <Textbox.AuctionBid
                hasBeenBidded={hasBeenBidded}
                currentBid={currentBid}
              />
            </S.InfoGrid>

            <CharacterItems items={items} />

            <CharacterSkills skills={skills} />

            <S.FlexFooter>
              <S.FlexColumn>
                <ImbuementsTooltip items={imbuements} />
                <CharmsTooltip items={charms} />
                <QuestsTooltip items={quests} />
              </S.FlexColumn>

              <S.FlexColumn data-checkbox>
                <S.Checkbox
                  label="Charm Expansion"
                  checked={charmInfo.expansion}
                />

                <S.Checkbox label="Prey Slot" checked={preySlot} />

                {tcInvested !== '0' && (
                  <S.FlexWrapper
                    title={`${common.CharacterCard.tcInvested.prefix} ${tcInvested} ${common.CharacterCard.tcInvested.suffix}`}
                  >
                    <S.CheckboxContainer>
                      <S.Icons.TibiaCoin />
                    </S.CheckboxContainer>
                    <S.Strong>
                      {tcInvested} {common.CharacterCard.tcInvested.invested}
                    </S.Strong>
                  </S.FlexWrapper>
                )}
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
