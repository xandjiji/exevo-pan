import { useMemo, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useStoredState } from 'hooks'
import { toast } from 'react-hot-toast'
import { localStorageKeys } from 'Constants'

export const useFavorites = () => {
  const {
    translations: { homepage },
  } = useTranslations()

  const [favorites, setFavorites] = useStoredState<number[]>(
    localStorageKeys.FAVORITES,
    [],
  )

  const favoriteSet = useMemo(() => new Set(favorites), [favorites])

  return {
    list: favorites,
    has: useCallback((id: number) => favoriteSet.has(id), [favoriteSet]),
    toggle: useCallback(
      (id: number) => {
        if (favoriteSet.has(id)) {
          setFavorites(
            [...favoriteSet].filter((favoritedId) => favoritedId !== id),
          )
          toast.success(
            homepage.AuctionsGrid.ExpandableCharacterCard.favorite.removed,
          )
        } else {
          setFavorites([...favoriteSet, id])
          toast.success(
            homepage.AuctionsGrid.ExpandableCharacterCard.favorite.added,
          )
        }
      },
      [favoriteSet],
    ),
  }
}
