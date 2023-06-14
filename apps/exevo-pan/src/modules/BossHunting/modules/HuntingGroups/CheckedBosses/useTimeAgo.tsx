/* eslint-disable consistent-return */
import { useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { MILLISECONDS_IN } from 'utils'

const extractTimeUnits = (
  milliseconds: number,
  unit: keyof typeof MILLISECONDS_IN,
): number => Math.floor(milliseconds / MILLISECONDS_IN[unit])

export const useTimeAgo = () => {
  const { common, huntingGroups } = useTranslations()
  const i18n = huntingGroups.CheckedBosses

  return useCallback(
    (pastDate?: Date): { readable: string; recent: boolean } | undefined => {
      if (!pastDate) return

      const millisecondsDiff = Math.abs(+new Date() - +pastDate)

      if (millisecondsDiff < MILLISECONDS_IN.MINUTE * 2) {
        return { readable: i18n.justChecked, recent: true }
      }

      if (millisecondsDiff <= MILLISECONDS_IN.HOUR) {
        return {
          readable: `${extractTimeUnits(millisecondsDiff, 'MINUTE')} ${
            i18n.minutesAgo
          }`,
          recent: millisecondsDiff <= MILLISECONDS_IN.HOUR / 2,
        }
      }

      if (millisecondsDiff < MILLISECONDS_IN.DAY) {
        const hoursSince = extractTimeUnits(millisecondsDiff, 'HOUR')
        return {
          readable: `${hoursSince} ${
            hoursSince > 1 ? i18n.hoursAgo : i18n.hourAgo
          }`,
          recent: false,
        }
      }
    },
    [common],
  )
}
