import { useMemo } from 'react'
import { getDateRelativeToSS } from 'shared-utils/dist/time'
import { useTranslations } from 'contexts/useTranslation'
import { dateToDateObject, MILLISECONDS_IN } from 'utils'

const useTimeAgo = (pastTimestamp?: number): string | undefined => {
  const {
    translations: { common, bosses },
  } = useTranslations()
  const i18n = bosses.BossCard

  return useMemo(() => {
    if (pastTimestamp === undefined) return undefined

    const timeDiff = Math.abs(+getDateRelativeToSS() - pastTimestamp)
    const { day, month } = dateToDateObject(new Date(pastTimestamp))

    const textPrefix = `${i18n.lastSeen}: ${common.Month[month]} ${day}`

    if (timeDiff < MILLISECONDS_IN.DAY) {
      return `${textPrefix} ${i18n.thisSS}`
    }

    const daysAgo = Math.round(timeDiff / MILLISECONDS_IN.DAY)
    return `${textPrefix} (${daysAgo} ${common[daysAgo > 1 ? 'days' : 'day']} ${
      i18n.ago
    })`
  }, [common, pastTimestamp])
}

export default useTimeAgo
