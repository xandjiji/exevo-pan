import { ExerciseWeapon } from '../../types'
import { autoRequiredWeaponsCount, customRequiredWeaponsCount } from '..'

describe('autoRequiredWeaponsCount()', () => {
  const cases: {
    input: number
    result: ReturnType<typeof autoRequiredWeaponsCount>
  }[] = [
    {
      input: 4984546,
      result: { regular: 3, durable: 4, lasting: 0 },
    },
    {
      input: 9879854647815.54,
      result: { regular: 3, durable: 5, lasting: 1143501 },
    },
    {
      input: 0,
      result: { regular: 0, durable: 0, lasting: 0 },
    },
  ]
  test.each(cases)('should calculate correctly', ({ input, result }) => {
    expect(autoRequiredWeaponsCount(input)).toEqual(result)
  })
})

describe('autoRequiredWeaponsCount()', () => {
  const cases: {
    input: [number, ExerciseWeapon]
    result: ReturnType<typeof customRequiredWeaponsCount>
  }[] = [
    {
      input: [9845422, 'regular'],
      result: { regular: 33, durable: 0, lasting: 0 },
    },
    {
      input: [4932402349, 'durable'],
      result: { regular: 0, durable: 4568, lasting: 0 },
    },
    {
      input: [123456789.439, 'lasting'],
      result: { regular: 0, durable: 0, lasting: 15 },
    },
    {
      input: [0, 'regular'],
      result: { regular: 0, durable: 0, lasting: 0 },
    },
  ]
  test.each(cases)('should calculate correctly', ({ input, result }) => {
    expect(customRequiredWeaponsCount(...input)).toEqual(result)
  })
})
