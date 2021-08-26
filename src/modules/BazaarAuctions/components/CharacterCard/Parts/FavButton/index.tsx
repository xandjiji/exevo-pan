import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { getFavArray, saveToLocalStorage } from 'utils'
import { localStorageKeys } from 'Constants'
import { isIdFavorited } from './utils'
import * as S from './styles'
import { FavButtonProps } from './types'

const FavButton = ({
  characterObject,
  ...props
}: FavButtonProps): JSX.Element => {
  const { t } = useTranslation('homepage')

  const [active, setActive] = useState<boolean>(() =>
    isIdFavorited(characterObject.id),
  )

  const handleClick = () => {
    const favArray: CharacterObject[] = getFavArray()

    const findCharacterIndexById = (id: number) => {
      for (let i = 0; i < favArray.length; i += 1) {
        if (favArray[i].id === id) return i
      }
      return -1
    }

    const charIndex = findCharacterIndexById(characterObject.id)
    if (charIndex >= 0) {
      favArray.splice(charIndex, 1)
      setActive(false)
    } else {
      favArray.push(characterObject)
      setActive(true)
    }

    saveToLocalStorage(localStorageKeys.FAV_CHARACTER_DATA, favArray)
  }

  const isFavLabel = `${t('CharacterCard.favButton.remove')} ${
    characterObject.nickname
  } ${t('CharacterCard.favButton.fromFav')}`
  const isntFavLabel = `${t('CharacterCard.favButton.add')} ${
    characterObject.nickname
  } ${t('CharacterCard.favButton.toFav')}`

  return (
    <S.FavButton
      aria-label={active ? isFavLabel : isntFavLabel}
      aria-pressed={active}
      active={active}
      onClick={handleClick}
      {...props}
    >
      <S.HeartIcon />
    </S.FavButton>
  )
}

export default FavButton
