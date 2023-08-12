import { getDateRelativeToSS, MILLISECONDS_IN } from 'shared-utils/dist/time'

const SPAWN_DATE = 13

export const getFeroxaStats = (
  getNextDayFeroxa = false,
): Pick<BossStats, 'currentChance' | 'expectedIn'> => {
  const SSDate = getDateRelativeToSS()
  if (getNextDayFeroxa) {
    SSDate.setDate(SSDate.getDate() + 1)
  }
  const checkingDate = SSDate.getDate()

  if (checkingDate === SPAWN_DATE) {
    return { currentChance: 1 }
  }

  if (checkingDate < SPAWN_DATE) {
    return { currentChance: 0, expectedIn: SPAWN_DATE - checkingDate }
  }

  const nextFeroxaSpawn = getDateRelativeToSS()
  nextFeroxaSpawn.setMonth(nextFeroxaSpawn.getMonth() + 1)
  nextFeroxaSpawn.setDate(SPAWN_DATE)

  return {
    currentChance: 0,
    expectedIn: Math.round(
      (+nextFeroxaSpawn - +getDateRelativeToSS()) / MILLISECONDS_IN.DAY,
    ),
  }
}
