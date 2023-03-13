import { useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { MILLISECONDS_IN } from 'utils'

const extractTimeUnits = (
  milliseconds: number,
  unit: keyof typeof MILLISECONDS_IN,
): number => Math.floor(milliseconds / MILLISECONDS_IN[unit])

export const useTimeAgo = () => {
  const {
    translations: { common },
  } = useTranslations()

  return useCallback(
    (pastDate: Date): string => {
      const millisecondsDiff = Math.abs(+new Date() - +pastDate)

      if (millisecondsDiff < MILLISECONDS_IN.MINUTE * 2) {
        return 'just checked'
      }

      if (millisecondsDiff <= MILLISECONDS_IN.HOUR) {
        return `${extractTimeUnits(millisecondsDiff, 'MINUTE')} minutes ago`
      }

      if (millisecondsDiff < MILLISECONDS_IN.DAY) {
        const hoursSince = extractTimeUnits(millisecondsDiff, 'HOUR')
        return `${hoursSince} ${hoursSince > 1 ? 'hours' : 'hour'} ago`
      }

      return ''
    },
    [common],
  )
}
