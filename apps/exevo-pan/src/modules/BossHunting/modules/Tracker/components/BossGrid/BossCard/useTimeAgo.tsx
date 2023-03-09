import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { dateToDateObject, MILLISECONDS_IN } from 'utils'

const useTimeAgo = (pastTimestamp?: number): string | undefined => {
  const {
    translations: { common, bossTracker },
  } = useTranslations()

  return useMemo(() => {
    if (pastTimestamp === undefined) return undefined

    const timeDiff = Math.abs(+new Date() - pastTimestamp)
    const { day, month } = dateToDateObject(new Date(pastTimestamp))

    const textPrefix = `${bossTracker.BossGrid.BossCard.lastSeen}: ${common.Month[month]} ${day}`

    if (timeDiff < MILLISECONDS_IN.DAY) {
      const hoursAgo = Math.round(timeDiff / MILLISECONDS_IN.HOUR)
      return `${textPrefix} (${hoursAgo} ${
        common[hoursAgo > 1 ? 'hours' : 'hour']
      } ${bossTracker.BossGrid.BossCard.ago})`
    }

    const daysAgo = Math.round(timeDiff / MILLISECONDS_IN.DAY)
    return `${textPrefix} (${daysAgo} ${common[daysAgo > 1 ? 'days' : 'day']} ${
      bossTracker.BossGrid.BossCard.ago
    })`
  }, [common, pastTimestamp])
}

export default useTimeAgo
