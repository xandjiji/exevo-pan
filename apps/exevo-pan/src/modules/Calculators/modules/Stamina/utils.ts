import { SECONDS_IN } from 'utils'

const HAPPY_HOUR_STAMINA = SECONDS_IN.HOUR * 39
const STAMINA_REGEN_RATE = 3

const normalizeBonusStamina = (stamina: number): number => {
  if (stamina > HAPPY_HOUR_STAMINA) {
    const bonusStamina = stamina - HAPPY_HOUR_STAMINA
    return HAPPY_HOUR_STAMINA + bonusStamina * 2
  }
  return stamina
}

export const calculateSecondsToRegenerate = (
  currentStamina: number,
  targetStamina: number,
) => {
  const secondsDiff =
    normalizeBonusStamina(targetStamina) - normalizeBonusStamina(currentStamina)

  return secondsDiff * STAMINA_REGEN_RATE
}
