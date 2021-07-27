export function toggleSet<T>(set: Set<T>, value: T): Set<T> {
  const newSet = new Set<T>([...set])
  if (newSet.has(value)) {
    newSet.delete(value)
  } else {
    newSet.add(value)
  }

  return newSet
}
/* @ ToDo: updateFilters aqui?  */
