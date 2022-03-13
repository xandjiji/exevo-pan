import { useEffect, useRef } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import { useForm } from '../../contexts/Form'
import * as S from './styles'

const HEADER_OFFSET = 60
const MAX_WIDTH = 768

const CharacterCard = (): JSX.Element | null => {
  const {
    translations: { advertise },
  } = useTranslations()
  const { selectedCharacter, currentStep, finished, isValid, dispatch } =
    useForm()

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shouldScroll = window.innerWidth < MAX_WIDTH
    if (selectedCharacter && shouldScroll) {
      window.scrollTo({
        top: (wrapperRef.current?.offsetTop ?? 0) - HEADER_OFFSET,
        behavior: 'smooth',
      })
    }
  }, [selectedCharacter])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            {advertise.NextButton}
          </Button>
        )}
      </S.Wrapper>
    )
  }
  return null
}

export default CharacterCard
