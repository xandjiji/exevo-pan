import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { localStorageKeys } from 'Constants'

const getAll = () =>
  getFromLocalStorage<number[]>(localStorageKeys.FAVORITES, [])

export const Favorites = {
  getAll,
  find: (id: number) => getAll().find((storedId) => storedId === id),
  toggle: (id: number) => {
    const storedIds = new Set(getAll())

    if (storedIds.has(id)) {
      storedIds.delete(id)
    } else {
      storedIds.add(id)
    }

    saveToLocalStorage<number[]>(localStorageKeys.FAVORITES, [...storedIds])
  },
}
