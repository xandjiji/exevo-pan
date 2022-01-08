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
  currentFilters: FilterOptions,
  key: keyof FilterOptions,
  value: any,
): FilterOptions => ({
  ...currentFilters,
  [key]: toggleSet(currentFilters[key] as Set<typeof value>, value),
})

export const countActiveFilters = (
  defaultFilters: FilterOptions,
  currentFilters: FilterOptions,
): number =>
  Object.keys(defaultFilters).reduce(
    (acc, filterKey) =>
      dequal(
        defaultFilters[filterKey as keyof FilterOptions],
        currentFilters[filterKey as keyof FilterOptions],
      )
        ? acc
        : acc + 1,
    0,
  )
