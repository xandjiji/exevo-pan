import { dequal } from 'dequal'

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
