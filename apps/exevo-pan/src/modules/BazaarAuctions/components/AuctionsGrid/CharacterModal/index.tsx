import { InfoGrid, Checkbox } from 'components/CharacterCard/styles'
import {
  Head,
  Textbox,
  CharacterItems,
  CharacterSkills,
} from 'components/CharacterCard/Parts'
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
  } = characterData

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

        <S.CheckboxWrapper>
          <Checkbox label="Training Dummy" />
          <Checkbox label="Gold pouch" />
          <Checkbox label="Hirelings" />
          <Checkbox label="Charm expansion" />
          <Checkbox label="Prey Slot" />
          <Checkbox label="Hunting Task Slot" />
          <Checkbox label="Imbuement Shrine" />
          <Checkbox label="Reward Shrine" />
          <Checkbox label="Mailbox" />
        </S.CheckboxWrapper>

        <CharacterSkills skills={skills} />
      </S.Wrapper>
      <S.Backdrop onClick={onClose} />
    </>
  )
}

export default CharacterModal
