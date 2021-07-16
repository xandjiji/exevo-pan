import { useState } from 'react'
import { getFavArray, saveToLocalStorage } from 'utils'
import { FAV_CHARACTER_DATA_KEY } from 'Constants'
import { isIdFavorited } from './utils'
import * as S from './styles'
import { FavButtonProps } from './types'

const FavButton = ({
  characterObject,
  ...props
}: FavButtonProps): JSX.Element => {
  const [active, setActive] = useState<boolean>(() =>
    isIdFavorited(characterObject.id),
  )

  const handleClick = () => {
    const favArray: CharacterObject[] = getFavArray()
    const charIndex = findCharacterIndexById(characterObject.id)
    if (charIndex >= 0) {
      favArray.splice(charIndex, 1)
      setActive(false)
    } else {
      favArray.push(characterObject)
      setActive(true)
    }

    saveToLocalStorage(FAV_CHARACTER_DATA_KEY, favArray)

    function findCharacterIndexById(id: number) {
      for (let i = 0; i < favArray.length; i++) {
        if (favArray[i].id === id) return i
      }
      return -1
    }
  }

  const isFavLabel = `Remove ${characterObject.nickname} from favorites`
  const isntFavLabel = `Add ${characterObject.nickname} to favorites`

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
