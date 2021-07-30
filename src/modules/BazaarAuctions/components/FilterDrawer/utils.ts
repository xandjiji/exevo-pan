import { dequal } from 'dequal'

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
  window.location.pathname === '/bazaar-history'

export const countActiveFilters = (
  defaultFilters: FilterState,
  currentFilters: FilterState,
): number => {
  let count = 0
  for (const filter in defaultFilters) {
    if (!dequal(defaultFilters[filter], currentFilters[filter])) count++
  }

  return count
}
