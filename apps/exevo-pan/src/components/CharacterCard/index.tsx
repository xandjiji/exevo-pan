import { useTranslations } from 'contexts/useTranslation'
import { memo, useState, useRef, useMemo, useCallback } from 'react'
import {
  formatNumberWithCommas,
  calculateTotalInvestment,
  checkKeyboardTrigger,
} from 'utils'
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
import CharacterModal from './CharacterModal'
import * as S from './styles'
import { CharacterCardProps } from './types'

const CharacterCard = ({
  characterData,
  highlighted = false,
  lazyRender = false,
  expandable = false,
  past = false,
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

  const [isExpanded, setExpanded] = useState(false)

  const expandCard = useCallback(() => setExpanded(true), [])
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (checkKeyboardTrigger(event.code)) expandCard()
    },
    [expandCard],
  )

  return (
    <>
      <S.Wrapper
        ref={ref as React.RefObject<HTMLDivElement>}
        data-highlighted={highlighted}
        role={expandable ? 'button' : undefined}
        tabIndex={expandable ? 1 : undefined}
        aria-label={expandable ? common.CharacterCard.expand : undefined}
        onClick={expandable ? expandCard : undefined}
        onKeyPress={expandable ? handleKeyPress : undefined}
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
        </Head>

        <S.Body data-lazy={lazyRender}>
          <S.InfoGrid>
            <Textbox.Server
              serverData={serverData}
              nickname={nickname}
              transfer={transfer}
            />
            <Textbox.Pvp serverData={serverData} />
            <Textbox.AuctionEnd auctionEnd={auctionEnd} past={past} />
            <Textbox.AuctionBid
              hasBeenBidded={hasBeenBidded}
              currentBid={currentBid}
              past={past}
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

            <S.FlexColumn data-store-column>
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
        </S.Body>

        <SpecialTags character={characterData} />
      </S.Wrapper>
      {isExpanded && (
        <CharacterModal
          characterData={characterData}
          onClose={() => setExpanded(false)}
        />
      )}
    </>
  )
}

export default memo(CharacterCard)
export { default as CardSkeleton } from './Skeleton'
