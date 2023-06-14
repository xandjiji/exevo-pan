import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import BaseCharacterCard, { CardSkeleton } from 'components/CharacterCard'
import { useForm } from '../../contexts/Form'
import styles from './styles.module.css'

const HEADER_OFFSET = 60
const MAX_WIDTH = 768

const CharacterCard = () => {
  const { advertise } = useTranslations()
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
      <div
        ref={wrapperRef}
        className="sticky top-[76px] flex flex-col gap-4 pt-4 md:pt-0"
      >
        {selectedCharacter ? (
          <BaseCharacterCard
            key={selectedCharacter.id}
            characterData={selectedCharacter}
            className={clsx(currentStep >= 1 && styles.miniCard)}
          />
        ) : (
          <CardSkeleton className={styles.skeleton} />
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
      </div>
    )
  }
  return null
}

export default CharacterCard
