import { getDateRelativeToSS, MILLISECONDS_IN } from 'shared-utils/dist/time'

const SPAWN_DATE = 23

export const getLeopoldStats = (
  getNextDayLeopold = false,
): Pick<BossStats, 'currentChance' | 'expectedIn'> => {
  const SSDate = getDateRelativeToSS()
  if (getNextDayLeopold) {
    SSDate.setDate(SSDate.getDate() + 1)
  }
  const checkingDate = SSDate.getDate()

  if (checkingDate === SPAWN_DATE) {
    return { currentChance: 1 }
  }

  if (checkingDate < SPAWN_DATE) {
    return { currentChance: 0, expectedIn: SPAWN_DATE - checkingDate }
  }

  const nextLeopoldSpawn = getDateRelativeToSS()
  nextLeopoldSpawn.setMonth(nextLeopoldSpawn.getMonth() + 1)
  nextLeopoldSpawn.setDate(SPAWN_DATE)

  return {
    currentChance: 0,
    expectedIn: Math.round(
      (+nextLeopoldSpawn - +getDateRelativeToSS()) / MILLISECONDS_IN.DAY,
    ),
  }
}
