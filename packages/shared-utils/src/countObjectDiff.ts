import { dequal } from 'dequal'

export const countObjectDiff = <T>(objectA: T, objectB: T): number => {
  const reducer = (count: number, key: string) =>
    !dequal(objectB[key as keyof T], objectA[key as keyof T])
      ? count + 1
      : count

  const objectAKeys = Object.keys(objectA)
  const objectBKeys = Object.keys(objectB)

  return (
    objectAKeys.reduce(reducer, 0) +
    objectBKeys.filter((key) => !objectAKeys.includes(key)).reduce(reducer, 0)
  )
}
