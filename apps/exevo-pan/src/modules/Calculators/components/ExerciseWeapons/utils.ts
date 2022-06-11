import * as CONSTANTS from './constants'
import { TotalPointsArgs } from './types'

export const totalPoints = ({
  currentSkill,
  vocation,
  skill,
}: TotalPointsArgs): number => {
  const vocationConstant = CONSTANTS.VOCATION[vocation][skill]

  const numerator = vocationConstant ** currentSkill - 1
  const denominator = vocationConstant - 1

  return CONSTANTS.SKILL * (numerator / denominator)
}
