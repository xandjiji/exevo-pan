import CharacterCardComponent, { CardSkeleton } from 'components/CharacterCard'
import { useSelectedCharacter } from '../../contexts/SelectedCharacter'

const CharacterCard = (): JSX.Element => {
  const { selectedCharacter } = useSelectedCharacter()

  return selectedCharacter ? (
    <CharacterCardComponent
      key={selectedCharacter.id}
      characterData={selectedCharacter}
    />
  ) : (
    <CardSkeleton />
  )
}

export default CharacterCard
