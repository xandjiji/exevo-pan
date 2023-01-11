import { useMemo, useCallback } from 'react'
import { useStoredState } from 'hooks'
import { localStorageKeys } from 'Constants'

export const useFavorites = () => {
  const [favorites, setFavorites] = useStoredState<number[]>(
    localStorageKeys.FAVORITES,
    [],
  )

  const favoriteSet = useMemo(() => new Set(favorites), [favorites])

  return {
    list: favorites,
    has: useCallback((id: number) => favoriteSet.has(id), [favoriteSet]),
    toggle: useCallback(
      (id: number) =>
        setFavorites(
          favoriteSet.has(id)
            ? [...favoriteSet].filter((favoritedId) => favoritedId !== id)
            : [...favoriteSet, id],
        ),
      [favoriteSet],
    ),
  }
}
