import { useEffect, useRef } from 'react'
import { Button } from 'components/Atoms'
import { useForm } from '../../contexts/Form'
import * as S from './styles'

const CharacterCard = (): JSX.Element | null => {
  const { selectedCharacter, currentStep, finished, isValid, dispatch } =
    useForm()

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedCharacter) {
      wrapperRef.current?.scrollIntoView({ block: 'start' })
    }
  }, [selectedCharacter])

  useEffect(() => {
    document
      .getElementById('main-wrapper')
      ?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  if (!finished) {
    return (
      <S.Wrapper ref={wrapperRef}>
        {selectedCharacter ? (
          <S.CharacterCard
            key={selectedCharacter.id}
            characterData={selectedCharacter}
            smaller={currentStep >= 1}
          />
        ) : (
          <S.CardSkeleton />
        )}
        {currentStep < 2 && (
          <Button
            type="button"
            disabled={!isValid}
            onClick={() =>
              dispatch({ type: 'SET_STEP', newStep: currentStep + 1 })
            }
          >
            Next
          </Button>
        )}
      </S.Wrapper>
    )
  }
  return null
}

export default CharacterCard
