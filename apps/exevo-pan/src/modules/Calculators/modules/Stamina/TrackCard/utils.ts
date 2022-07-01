import { SECONDS_IN } from 'utils'
import { padTime, STAMINA_REGEN_RATE, HAPPY_HOUR_STAMINA } from '../utils'

export const seconds2Time = (seconds: number): string => {
  const hours = Math.floor(seconds / SECONDS_IN.HOUR)
  const minutes = Math.floor((seconds % SECONDS_IN.HOUR) / SECONDS_IN.MINUTE)

  return `${padTime(hours)}:${padTime(minutes)}`
}

export const regenerateStamina = (
  currentStamina: number,
  secondsPassed: number,
): number => {
  const regeneratedSeconds = Math.floor(secondsPassed / STAMINA_REGEN_RATE)

  const regeneratedStamina = currentStamina + regeneratedSeconds

  if (currentStamina > HAPPY_HOUR_STAMINA) {
    return currentStamina + Math.floor(regeneratedSeconds / 2)
  }

  if (regeneratedStamina > HAPPY_HOUR_STAMINA) {
    const greenSeconds = regeneratedStamina - HAPPY_HOUR_STAMINA
    return HAPPY_HOUR_STAMINA + Math.floor(greenSeconds / 2)
  }

  return regeneratedStamina
}
