import { dequal } from 'dequal'
import { gtag } from 'utils'

export const toggleSet = <T>(set: Set<T>, value: T): Set<T> => {
  const newSet = new Set<T>([...set])
  if (newSet.has(value)) {
    newSet.delete(value)
  } else {
    newSet.add(value)
  }

  return newSet
}

export const countActiveFilters = (
  defaultFilters: FilterOptions,
  currentFilters: FilterOptions,
): number => {
  let count = 0
  Object.keys(defaultFilters).forEach((filterKey) => {
    const diff = !dequal(
      defaultFilters[filterKey as keyof FilterOptions],
      currentFilters[filterKey as keyof FilterOptions],
    )

    if (diff) {
      count += 1
      gtag.filterUsed(filterKey)
    }
  })

  return count
}
