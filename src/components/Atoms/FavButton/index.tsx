import { useState } from 'react'
import { getFavArray, saveToLocalStorage, checkKeyboardTrigger } from 'utils'
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

    saveToLocalStorage('initialFavCharacterData', favArray)

    function findCharacterIndexById(id: number) {
      for (let i = 0; i < favArray.length; i++) {
        if (favArray[i].id === id) return i
      }
      return -1
    }
  }

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (checkKeyboardTrigger(event.code)) {
      console.log('a')
      event.preventDefault()
      handleClick()
    }
  }

  const isFavLabel = `Remove ${characterObject.nickname} from favorites`
  const isntFavLabel = `Add ${characterObject.nickname} to favorites`

  return (
    <S.FavButton
      aria-label={active ? isFavLabel : isntFavLabel}
      active={active}
      onClick={handleClick}
      onKeyDown={handleKeypress}
      {...props}
    >
      <S.HeartIcon />
    </S.FavButton>
  )
}

export default FavButton
