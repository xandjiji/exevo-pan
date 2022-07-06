import { useMemo, memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { InfoTooltip } from 'components/Organisms'
import { Group, TimeBubbles } from '../../components'
import { generateDatetime } from './utils'

const TimeLeft = ({ secondsToRegenerate }: { secondsToRegenerate: number }) => {
  const {
    translations: { common, calculators },
  } = useTranslations()

  const { day, month, weekday, hours, minutes } = useMemo(
    () => generateDatetime(secondsToRegenerate),
    [secondsToRegenerate],
  )

  return (
    <Group>
      <div className="flex items-center gap-1">
        <strong>{calculators.Stamina.restTime}</strong>
        <InfoTooltip
          className="h-3 w-3"
          content={
            <span className="whitespace-nowrap">
              {`${common.Month[month]} ${day}, ${hours}:${minutes} (${
                typeof weekday === 'number'
                  ? common.FullWeekdays[weekday]
                  : common[weekday]
              })`}
            </span>
          }
        />
      </div>
      <TimeBubbles seconds={secondsToRegenerate} />
    </Group>
  )
}

export default memo(TimeLeft)
