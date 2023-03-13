/* eslint-disable consistent-return */
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
    (pastDate?: Date): { readable: string; recent: boolean } | undefined => {
      if (!pastDate) return

      const millisecondsDiff = Math.abs(+new Date() - +pastDate)

      if (millisecondsDiff < MILLISECONDS_IN.MINUTE * 2) {
        return { readable: 'just checked', recent: true }
      }

      if (millisecondsDiff <= MILLISECONDS_IN.HOUR) {
        return {
          readable: `${extractTimeUnits(
            millisecondsDiff,
            'MINUTE',
          )} minutes ago`,
          recent: true,
        }
      }

      if (millisecondsDiff < MILLISECONDS_IN.DAY) {
        const hoursSince = extractTimeUnits(millisecondsDiff, 'HOUR')
        return {
          readable: `${hoursSince} ${hoursSince > 1 ? 'hours' : 'hour'} ago`,
          recent: false,
        }
      }
    },
    [common],
  )
}
