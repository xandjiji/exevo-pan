import { useTranslations } from 'contexts/useTranslation'
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
  const {
    translations: { homepage },
  } = useTranslations()

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

  const isFavLabel = `${homepage.CharacterCard.favButton.remove} ${characterObject.nickname} ${homepage.CharacterCard.favButton.fromFav}`
  const isntFavLabel = `${homepage.CharacterCard.favButton.add} ${characterObject.nickname} ${homepage.CharacterCard.favButton.toFav}`

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
