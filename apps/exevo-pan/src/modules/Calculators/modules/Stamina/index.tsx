import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { TimeInput } from 'components/Atoms'
import useTime from './useTime'
import StaminaBar from './StaminaBar'
import { calculateSecondsToRegenerate, generateDatetime } from './utils'
import {
  Main,
  LabeledCard,
  Group,
  Chip,
  TimeBubbles,
  Empty,
} from '../../components'

/* @ ToDo:
-results
    timestamp
        phantom space
    tooltip +10 min logout
-useStorageState
-i18n
-stamina bar?
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
          <StaminaBar time={currentStamina.time} />

          <Group>
            <p>
              <strong>Time required</strong>
            </p>
            <TimeBubbles seconds={secondsToRegenerate} />
          </Group>

          <Group>
            <p>
              <strong>Ready on</strong>
            </p>
            <div className="relative grid gap-2">
              <Chip aria-hidden={!secondsToRegenerate}>{`${
                common.Month[month]
              } ${day}, ${hours}:${minutes} (${
                typeof weekday === 'number'
                  ? common.FullWeekdays[weekday]
                  : common[weekday]
              })`}</Chip>
              <Empty aria-hidden={!!secondsToRegenerate}>
                {calculators.none}
              </Empty>
            </div>
          </Group>
        </LabeledCard>
      </div>
    </Main>
  )
}

export default Stamina
