import { getHighestSkill } from 'utils'
import { Skill } from './types'

const skillOptions: Array<keyof CharacterSkillsObject> = [
  'axe',
  'club',
  'sword',
  'magic',
  'distance',
]

export const getInitialSkill = (skills: CharacterSkillsObject): Skill => {
  const { skill: highestSkill } = getHighestSkill(skills)

  return skillOptions.includes(highestSkill) ? (highestSkill as Skill) : 'magic'
}
