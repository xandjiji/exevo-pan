import { SkillAfterLoyalty } from '../types'
import { skillAfterLoyalty } from '..'

type Case = {
  input: SkillAfterLoyalty
  result: number
}

const cases: Case[] = [
  {
    input: {
      skillValue: 123,
      skill: 'distance',
      vocation: 'paladin',
      loyaltyBonus: 45,
    },
    result: 126.89839819647698,
  },
  {
    input: {
      skillValue: 40,
      skill: 'magic',
      vocation: 'paladin',
      loyaltyBonus: 5,
    },
    result: 40.14500482011777,
  },
  {
    input: {
      skillValue: 99,
      skill: 'melee',
      vocation: 'knight',
      loyaltyBonus: 20,
    },
    result: 100.9125664243153,
  },
  {
    input: {
      skillValue: 15,
      skill: 'magic',
      vocation: 'sorcerer',
      loyaltyBonus: 50,
    },
    result: 18.381629827393052,
  },
  {
    input: {
      skillValue: 144,
      skill: 'magic',
      vocation: 'druid',
      loyaltyBonus: 50,
    },
    result: 148.25415987995794,
  },
  {
    input: {
      skillValue: 144,
      skill: 'magic',
      vocation: 'druid',
      loyaltyBonus: 0,
    },
    result: 144,
  },
]

describe('skillAfterLoyalty()', () => {
  test.each(cases)('should calculate correctly', ({ input, result }) => {
    expect(skillAfterLoyalty(input)).toEqual(result)
  })
})
