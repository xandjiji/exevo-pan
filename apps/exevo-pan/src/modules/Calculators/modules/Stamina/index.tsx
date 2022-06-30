import { useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { TimeInput, Button } from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import ChevronRight from 'assets/svgs/chevronRight.svg'
import AddIcon from 'assets/svgs/addPost.svg'
import useTime from './useTime'
import StaminaBar from './StaminaBar'
import { calculateSecondsToRegenerate, generateDatetime } from './utils'
import { Main, LabeledCard, Group, TimeBubbles } from '../../components'

/* @ ToDo:
- track feature
- mark title

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
      <LabeledCard labelText="Results">
        <div className="flex items-end gap-2">
          <TimeInput
            label="Current stamina"
            max={42}
            value={currentStamina.time}
            onChange={(e) => setCurrentStamina(e.target.value)}
            error={invalid}
            className="child:w-full child:whitespace-nowrap w-full"
            noAlert
          />
          <ChevronRight
            className={clsx(
              'mb-1.5 shrink-0',
              invalid ? 'fill-red' : 'fill-onSurface',
            )}
          />
          <TimeInput
            label="Desired stamina"
            max={42}
            value={targetStamina.time}
            onChange={(e) => setTargetStamina(e.target.value)}
            error={invalid}
            className="child:w-full child:whitespace-nowrap w-full"
            noAlert
          />
        </div>

        <StaminaBar time={currentStamina.time} mark={targetStamina.time} />

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

        <Button type="button" style={{ padding: '5px 16px' }}>
          <div className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider">
            <AddIcon class="fill-onPrimary -ml-1 h-4 w-4" /> Track
          </div>
        </Button>
      </LabeledCard>
    </Main>
  )
}

export default Stamina
