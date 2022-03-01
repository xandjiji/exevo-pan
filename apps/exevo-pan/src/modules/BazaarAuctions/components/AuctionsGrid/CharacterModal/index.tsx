import { useMemo } from 'react'
import { Accordion } from 'components/Atoms'
import { InfoGrid, Checkbox } from 'components/CharacterCard/styles'
import {
  Head,
  Textbox,
  CharacterItems,
  CharacterSkills,
} from 'components/CharacterCard/Parts'
import Lister from 'components/CharacterCard/Parts/Tooltips/Lister'
import {
  Icons,
  TitleWrapper as AccordionTitle,
} from 'components/CharacterCard/Parts/Tooltips/styles'
import { tokens as imbuementTokens } from 'data-dictionary/dist/dictionaries/imbuement'
import { tokens as charmTokens } from 'data-dictionary/dist/dictionaries/charm'
import { checkStore } from './utils'
import * as S from './styles'
import { CharacterModalProps } from './types'

const MAX_LINES = {
  imbuements: 12,
  charms: 10,
}

const CharacterModal = ({
  open,
  characterData,
  onClose,
}: CharacterModalProps): JSX.Element | null => {
  if (!open || !characterData) return null
  const {
    id,
    outfitId,
    nickname,
    level,
    vocationId,
    serverData,
    transfer,
    auctionEnd,
    hasBeenBidded,
    currentBid,
    items,
    skills,
    hirelings,
    charmInfo,
    preySlot,
    huntingSlot,
    storeItems,
    imbuements,
    charms,
  } = characterData

  const checkboxRecords = useMemo(() => checkStore(storeItems), [])

  return (
    <>
      <S.Wrapper>
        <Head
          id={id}
          outfitId={outfitId}
          nickname={nickname}
          level={level}
          vocationId={vocationId}
          serverName={serverData.serverName}
        />

        <InfoGrid>
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
        </InfoGrid>

        <CharacterItems items={items} />

        <CharacterSkills skills={skills} />

        <S.CheckboxWrapper>
          <Checkbox label="Training Dummy" checked={checkboxRecords.dummy} />
          <Checkbox label="Gold pouch" checked={checkboxRecords.goldPouch} />
          <Checkbox label="Hirelings" checked={hirelings.count > 0} />
          <Checkbox label="Charm expansion" checked={charmInfo.expansion} />
          <Checkbox label="Prey Slot" checked={preySlot} />
          <Checkbox label="Hunting Task Slot" checked={huntingSlot} />
          <Checkbox
            label="Imbuement Shrine"
            checked={checkboxRecords.imbuementShrine}
          />
          <Checkbox
            label="Reward Shrine"
            checked={checkboxRecords.rewardShrine}
          />
          <Checkbox label="Mailbox" checked={checkboxRecords.mailbox} />
        </S.CheckboxWrapper>

        <Accordion
          title={
            <AccordionTitle>
              <Icons.Imbuement />
              {`Imbuements: ${imbuements.length}/${imbuementTokens.length}`}
            </AccordionTitle>
          }
          initialValue
        >
          <Lister
            maxLines={MAX_LINES.imbuements}
            partialList={imbuements}
            fullList={imbuementTokens}
          />
        </Accordion>

        <Accordion
          title={
            <AccordionTitle>
              <Icons.Imbuement />
              Charms: {charms.length}/{charmTokens.length} (
              <strong style={{ marginRight: 2 }}>{charmInfo.total}</strong>{' '}
              total points,
              <strong style={{ margin: 2 }}>{charmInfo.unspent}</strong>{' '}
              unspent)
            </AccordionTitle>
          }
          initialValue
        >
          <Lister
            maxLines={MAX_LINES.charms}
            partialList={charms}
            fullList={charmTokens}
          />
        </Accordion>
      </S.Wrapper>
      <S.Backdrop onClick={onClose} />
    </>
  )
}

export default CharacterModal
