import { useSelectedCharacter } from '../../contexts/SelectedCharacter'
import * as S from './styles'

const CharacterCard = (): JSX.Element => {
  const { selectedCharacter } = useSelectedCharacter()

  return selectedCharacter ? (
    <S.CharacterCard
      key={selectedCharacter.id}
      characterData={selectedCharacter}
    />
  ) : (
    <S.CardSkeleton />
  )
}

export default CharacterCard
