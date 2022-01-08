export const arrayPartitions = <T>(array: T[], size: number): Array<T[]> => {
  const partitions = []

  for (let offset = 0; offset < array.length; offset += size) {
    partitions.push(array.slice(offset, offset + size))
  }

  return partitions
}
