import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { TimeInput } from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import useTime from './useTime'
import StaminaBar from './StaminaBar'
import { calculateSecondsToRegenerate, generateDatetime } from './utils'
import { Main, LabeledCard, Group, TimeBubbles } from '../../components'

/* @ ToDo:
-results
    rest time tooltip calendar
-i18n
*/

const Stamina = () => {
  const {
    translations: { common, calculators },
  } = useTranslations()

  const [currentStamina, setCurrentStamina] = useTime('39:00')
  const [targetStamina, setTargetStamina] = useTime('42:00')

  const invalid = currentStamina.seconds > targetStamina.seconds

  const secondsToRegenerate = useMemo(
    () =>
      Math.max(
        calculateSecondsToRegenerate(
          currentStamina.seconds,
          targetStamina.seconds,
        ),
        0,
      ),
    [currentStamina.seconds, targetStamina.seconds],
  )

  const { day, month, weekday, hours, minutes } = useMemo(
    () => generateDatetime(secondsToRegenerate),
    [secondsToRegenerate],
  )

  return (
    <Main>
      <div className="grid gap-6 md:grid-cols-2">
        <LabeledCard labelText="Stamina">
          <TimeInput
            label="Current stamina"
            max={42}
            value={currentStamina.time}
            onChange={(e) => setCurrentStamina(e.target.value)}
            error={invalid}
            noAlert
          />

          <TimeInput
            label="Desired stamina"
            max={42}
            value={targetStamina.time}
            onChange={(e) => setTargetStamina(e.target.value)}
            error={invalid}
            noAlert
          />
        </LabeledCard>

        <LabeledCard labelText="Results">
          <Group>
            <div className="flex items-center gap-1">
              <strong>Rest time</strong>
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

          <StaminaBar time={currentStamina.time} mark={targetStamina.time} />
        </LabeledCard>
      </div>
    </Main>
  )
}

export default Stamina
