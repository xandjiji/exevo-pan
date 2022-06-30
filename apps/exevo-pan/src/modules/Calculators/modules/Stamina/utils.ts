import { SECONDS_IN, dateToDateObject } from 'utils'

export const HAPPY_HOUR_STAMINA = SECONDS_IN.HOUR * 39
export const STAMINA_REGEN_RATE = 3

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

export const padTime = (time: string | number) =>
  time.toString().padStart(2, '0')

export const generateDatetime = (secondsToRegenerate: number) => {
  const currentDate = new Date()
  const nextDate = new Date(+currentDate + secondsToRegenerate * 1000)

  const { day, month, weekday, hours, minutes } = dateToDateObject(nextDate)

  const today = currentDate.getDay()
  const nextDay = nextDate.getDay()
  const normalizedOffset = today > nextDay ? 7 : 0
  const dayDiff = nextDay + normalizedOffset - today

  return {
    day,
    month,
    hours: padTime(hours),
    minutes: padTime(minutes),
    weekday: dayDiff === 0 ? 'today' : dayDiff === 1 ? 'tomorrow' : weekday,
  }
}
