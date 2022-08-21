import { RequiredSkillPointsArgs } from '../types'
import { requiredSkillPoints } from '..'

type Case = {
  input: RequiredSkillPointsArgs
  result: number
}

const cases: Case[] = [
  {
    input: {
      vocation: 'paladin',
      skill: 'distance',
      currentSkill: 99,
      targetSkill: 100,
      percentageLeft: 53.18,
      loyaltyBonus: 10,
    },
    result: 9690617.708849682,
  },
  {
    input: {
      vocation: 'paladin',
      skill: 'magic',
      currentSkill: 34,
      targetSkill: 36,
      percentageLeft: 0,
      loyaltyBonus: 25,
    },
    result: 166606222.78599826,
  },
  {
    input: {
      vocation: 'knight',
      skill: 'melee',
      currentSkill: 120,
      targetSkill: 131,
      percentageLeft: 1,
      loyaltyBonus: 0,
    },
    result: 2601960422.7401447,
  },
  {
    input: {
      vocation: 'knight',
      skill: 'melee',
      currentSkill: 120,
      targetSkill: 121,
      percentageLeft: 0,
      loyaltyBonus: 0,
    },
    result: 0,
  },
  {
    input: {
      vocation: 'sorcerer',
      skill: 'magic',
      currentSkill: 100,
      targetSkill: 101,
      percentageLeft: 12.34,
      loyaltyBonus: 45,
    },
    result: 1876444.2071548423,
  },
  {
    input: {
      vocation: 'druid',
      skill: 'magic',
      currentSkill: 9,
      targetSkill: 15,
      percentageLeft: 56.78,
      loyaltyBonus: 0,
    },
    result: 27478.239667370122,
  },
]

describe('requiredSkillPoints()', () => {
  test.each(cases)('should calculate correctly', ({ input, result }) => {
    expect(requiredSkillPoints(input)).toEqual(result)
  })
})
