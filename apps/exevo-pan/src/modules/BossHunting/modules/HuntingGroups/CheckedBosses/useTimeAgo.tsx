import { useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { dateToDateObject, MILLISECONDS_IN } from 'utils'

export const useTimeAgo = () => {
  const {
    translations: { common },
  } = useTranslations()

  return useCallback(
    (pastDate: Date) => {
      const millisecondsDiff = Math.abs(+new Date() - +pastDate)

      if (millisecondsDiff <= MILLISECONDS_IN.MINUTE) {
        console.log(9)
      }
      return dateToDateObject(pastDate)
    },
    [common],
  )

  /* return useMemo(() => {
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
  }, [common, pastTimestamp]) */
}
