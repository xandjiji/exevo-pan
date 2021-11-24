import { dequal } from 'dequal'

function toggleSet<T>(set: Set<T>, value: T): Set<T> {
  const newSet = new Set<T>([...set])
  if (newSet.has(value)) {
    newSet.delete(value)
  } else {
    newSet.add(value)
  }

  return newSet
}

export const toggleFilterValue = (
  currentFilters: FilterState,
  key: keyof FilterState,
  value: any,
): FilterState => ({
  ...currentFilters,
  [key]: toggleSet(currentFilters[key] as Set<typeof value>, value),
})

export const countActiveFilters = (
  defaultFilters: FilterState,
  currentFilters: FilterState,
): number =>
  Object.keys(defaultFilters).reduce(
    (acc, filterKey) =>
      dequal(
        defaultFilters[filterKey as keyof FilterState],
        currentFilters[filterKey as keyof FilterState],
      )
        ? acc
        : acc + 1,
    0,
  )
