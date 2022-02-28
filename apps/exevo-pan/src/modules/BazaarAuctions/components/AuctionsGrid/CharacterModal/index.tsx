import { InfoGrid } from 'components/CharacterCard/styles'
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

        <CharacterSkills skills={skills} />
      </S.Wrapper>
      <S.Backdrop onClick={onClose} />
    </>
  )
}

export default CharacterModal
