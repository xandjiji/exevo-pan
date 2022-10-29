import { useTranslations } from 'contexts/useTranslation'
import { memo, useState, useCallback } from 'react'
import { useSyncUrlState } from 'hooks'
import { formatNumberWithCommas, checkKeyboardTrigger } from 'utils'
import { urlParameters } from 'Constants'
import {
  Head,
  TagButton,
  Textbox,
  CharacterItems,
  CharacterSkills,
  ImbuementsTooltip,
  CharmsTooltip,
  QuestsTooltip,
  BossPoints,
  SpecialTags,
} from './Parts'
import CharacterModal from './CharacterModal'
import * as S from './atoms'
import { CharacterCardProps } from './types'

export const BOSS_SLOT_POINTS = 500

const CharacterCard = ({
  characterData,
  highlighted = false,
  lazyRender = false,
  expandable = false,
  past = false,
  permalink,
  ...props
}: CharacterCardProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const {
    id,
    nickname,
    outfitId,
    level,
    vocationId,
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
    bossPoints,
    server,
  } = characterData

  const tcInvested = formatNumberWithCommas(characterData.tcInvested)

  const [isExpanded, setExpanded] = useState(false)
  const [, setAuctionIdUrl] = useSyncUrlState<number | undefined>({
    key: urlParameters.AUCTION_ID,
    defaultValue: undefined,
  })

  const expandCard = useCallback(() => {
    if (permalink) setAuctionIdUrl(id)
    setExpanded(true)
  }, [id, permalink])

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (checkKeyboardTrigger(event.code)) expandCard()
    },
    [expandCard],
  )

  return (
    <>
      <S.Wrapper
        highlighted={highlighted}
        role={expandable ? 'button' : undefined}
        tabIndex={expandable ? 0 : undefined}
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
          serverName={server.serverName}
          highlighted={highlighted}
        >
          {highlighted && <TagButton />}
        </Head>

        <S.Body lazy={lazyRender}>
          <S.InfoGrid>
            <Textbox.Server
              server={server}
              nickname={nickname}
              transfer={transfer}
            />
            <Textbox.Pvp server={server} />
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
              <BossPoints bossPoints={bossPoints} />
            </S.FlexColumn>

            <S.FlexColumn storeColumn>
              <S.Checkbox
                label="Charm Expansion"
                checked={charmInfo.expansion}
              />

              <S.Checkbox label="Prey Slot" checked={preySlot} />

              <S.Checkbox
                label="Boss Slot"
                checked={bossPoints >= BOSS_SLOT_POINTS}
              />

              {tcInvested !== '0' && (
                <div
                  className="flex items-center justify-between gap-1.5"
                  title={`${common.CharacterCard.tcInvested.prefix} ${tcInvested} ${common.CharacterCard.tcInvested.suffix}`}
                >
                  <S.CheckboxContainer>
                    <S.Icons.TibiaCoin />
                  </S.CheckboxContainer>
                  <S.Strong>
                    {tcInvested} {common.CharacterCard.tcInvested.invested}
                  </S.Strong>
                </div>
              )}
            </S.FlexColumn>
          </S.FlexFooter>
        </S.Body>

        <SpecialTags character={characterData} />
      </S.Wrapper>
      {isExpanded && (
        <CharacterModal
          characterData={characterData}
          onClose={() => {
            if (permalink) setAuctionIdUrl(undefined)
            setExpanded(false)
          }}
          past={past}
          permalink={permalink}
        />
      )}
    </>
  )
}

export default memo(CharacterCard)
export { default as CardSkeleton } from './Skeleton'
