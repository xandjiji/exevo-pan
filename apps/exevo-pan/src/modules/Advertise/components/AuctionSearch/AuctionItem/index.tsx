import { vocation } from 'shared-utils/dist/vocations'
import CharacterMiniCard from 'components/CharacterMiniCard'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'
import { AuctionItemProps } from './types'

const AuctionItem = ({
  nickname,
  level,
  vocationId,
  outfitId,
  ...props
}: AuctionItemProps) => {
  const { selectedCharacter } = useForm()

  return (
    <S.Button
      {...props}
      aria-selected={selectedCharacter?.nickname === nickname}
    >
      <CharacterMiniCard
        outfitSrc={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
        characterData={{
          level,
          name: nickname,
          vocation: vocation.getFullName(vocationId, level),
          world: '',
        }}
      />
      <S.Arrow />
    </S.Button>
  )
}

export default AuctionItem
