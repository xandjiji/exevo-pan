import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { TimeInput } from 'components/Atoms'
import useTime from './useTime'
import { calculateSecondsToRegenerate } from './utils'
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
    translations: { calculators },
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

  const readyOn = useMemo(
    () => new Date(+new Date() + secondsToRegenerate * 1000).toLocaleString(),
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
            <p>
              <strong>Time required</strong>
            </p>
            <TimeBubbles seconds={secondsToRegenerate} />
          </Group>

          <Group>
            <p>
              <strong>Ready on</strong>
            </p>
            <div className="relative">
              <Chip aria-hidden={!secondsToRegenerate}>{readyOn}</Chip>
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
