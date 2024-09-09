import { WeaponsObject } from '../../types'
import { skillCost } from '..'

type Case = {
  input: WeaponsObject
  result: ReturnType<typeof skillCost>
}

const cases: Case[] = [
  {
    input: {
      regular: 11,
      durable: 0,
      lasting: 113,
    },
    result: {
      gold: 1133819442,
      seconds: 3265400,
      tc: 81635,
    },
  },
  {
    input: {
      regular: 0,
      durable: 0,
      lasting: 0,
    },
    result: {
      gold: 0,
      seconds: 0,
      tc: 0,
    },
  },
  {
    input: {
      regular: 65,
      durable: 0,
      lasting: 0,
    },
    result: {
      gold: 22569430,
      seconds: 65000,
      tc: 1625,
    },
  },
  {
    input: {
      regular: 0,
      durable: 13,
      lasting: 0,
    },
    result: {
      gold: 16250000,
      seconds: 46800,
      tc: 1170,
    },
  },
  {
    input: {
      regular: 2,
      durable: 4,
      lasting: 8,
    },
    result: {
      gold: 85694444,
      seconds: 246800,
      tc: 6170,
    },
  },
]

describe('skillCost()', () => {
  test.each(cases)('should calculate correctly', ({ input, result }) => {
    expect(skillCost(input)).toEqual(result)
  })
})
