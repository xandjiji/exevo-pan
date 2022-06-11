import { TotalPointsArgs } from './types'

export const totalPoints = ({
  currentSkill,
  vocationConstant,
  skillConstant,
  skillOffset,
}: TotalPointsArgs): number => {
  const numerator = vocationConstant ** (currentSkill - skillOffset) - 1
  const denominator = vocationConstant - 1

  return skillConstant * (numerator / denominator)
}
