import { useEffect, useRef } from 'react'
import { Button } from 'components/Atoms'
import { useForm } from '../../contexts/Form'
import * as S from './styles'

const CharacterCard = (): JSX.Element => {
  const { selectedCharacter } = useForm()

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selectedCharacter) {
      wrapperRef.current?.scrollIntoView({ block: 'start' })
    }
  }, [selectedCharacter])

  return (
    <S.Wrapper id="second-column" ref={wrapperRef}>
      {selectedCharacter ? (
        <S.CharacterCard
          key={selectedCharacter.id}
          characterData={selectedCharacter}
        />
      ) : (
        <S.CardSkeleton />
      )}
      <Button type="button" disabled={!selectedCharacter}>
        Next
      </Button>
    </S.Wrapper>
  )
}

export default CharacterCard
