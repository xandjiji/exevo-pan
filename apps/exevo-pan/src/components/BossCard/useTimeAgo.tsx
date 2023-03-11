import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { dateToDateObject, MILLISECONDS_IN } from 'utils'

const useTimeAgo = (pastTimestamp?: number): string | undefined => {
  const {
    translations: { common },
  } = useTranslations()
  const i18n = common.BossCard

  return useMemo(() => {
    if (pastTimestamp === undefined) return undefined

    const timeDiff = Math.abs(+new Date() - pastTimestamp)
    const { day, month } = dateToDateObject(new Date(pastTimestamp))

    const textPrefix = `${i18n.lastSeen}: ${common.Month[month]} ${day}`

    if (timeDiff < MILLISECONDS_IN.DAY) {
      const hoursAgo = Math.round(timeDiff / MILLISECONDS_IN.HOUR)
      return `${textPrefix} (${hoursAgo} ${
        common[hoursAgo > 1 ? 'hours' : 'hour']
      } ${i18n.ago})`
    }

    const daysAgo = Math.round(timeDiff / MILLISECONDS_IN.DAY)
    return `${textPrefix} (${daysAgo} ${common[daysAgo > 1 ? 'days' : 'day']} ${
      i18n.ago
    })`
  }, [common, pastTimestamp])
}

export default useTimeAgo
