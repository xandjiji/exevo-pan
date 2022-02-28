import { useMemo } from 'react'
import { InfoGrid, Checkbox } from 'components/CharacterCard/styles'
import {
  Head,
  Textbox,
  CharacterItems,
  CharacterSkills,
} from 'components/CharacterCard/Parts'
import { checkStore } from './utils'
import * as S from './styles'
import { CharacterModalProps } from './types'

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
      </S.Wrapper>
      <S.Backdrop onClick={onClose} />
    </>
  )
}

export default CharacterModal
