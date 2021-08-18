import { dequal } from 'dequal'
import { routes } from 'Constants'

export function toggleSet<T>(set: Set<T>, value: T): Set<T> {
  const newSet = new Set<T>([...set])
  if (newSet.has(value)) {
    newSet.delete(value)
  } else {
    newSet.add(value)
  }

  return newSet
}

export const isHistory = (): boolean =>
  window.location.pathname === routes.BAZAAR_HISTORY

export const countActiveFilters = (
  defaultFilters: FilterState,
  currentFilters: FilterState,
): number => {
  let count = 0

  Object.keys(defaultFilters).forEach((filter) => {
    if (
      !dequal(
        defaultFilters[filter as keyof FilterState],
        currentFilters[filter as keyof FilterState],
      )
    )
      count += 1
  })

  return count
}
