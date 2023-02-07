import { useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { LabeledCard, TimeInput, Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { ClientComponent } from 'components/Organisms'
import { ChevronRightIcon, AddPostIcon } from 'assets/svgs'
import { blurOnEnter } from 'utils'
import useTime from './useTime'
import TimeLeft from './TimeLeft'
import StaminaBar from './StaminaBar'
import TrackCard from './TrackCard'
import useTracking from './useTracking'
import { calculateSecondsToRegenerate } from './utils'

const Stamina = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  const [currentStamina, setCurrentStamina] = useTime('39:00')
  const [targetStamina, setTargetStamina] = useTime('42:00')

  const invalid = currentStamina.seconds > targetStamina.seconds
  const disableTrack =
    invalid || Number.isNaN(currentStamina.seconds + targetStamina.seconds)

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

  const { list, action } = useTracking()

  return (
    <>
      <LabeledCard labelText="Stamina" className="md:sticky md:top-[130px]">
        <div className="grid grid-cols-[1fr_24px_1fr] items-end gap-2">
          <TimeInput
            label={calculators.Stamina.currentStamina}
            max={42}
            value={currentStamina.time}
            onChange={(e) => setCurrentStamina(e.target.value)}
            error={invalid}
            className="child:w-full child:whitespace-nowrap w-full"
            noAlert
          />
          <ChevronRightIcon
            className={clsx(
              'mb-1.5 shrink-0',
              invalid ? 'fill-red' : 'fill-onSurface',
            )}
          />
          <TimeInput
            label={calculators.Stamina.desiredStamina}
            max={42}
            value={targetStamina.time}
            onChange={(e) => setTargetStamina(e.target.value)}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
            error={invalid}
            className="child:w-full child:whitespace-nowrap w-full"
            noAlert
          />
        </div>

        <StaminaBar time={currentStamina.time} mark={targetStamina.time} />

        <TimeLeft secondsToRegenerate={secondsToRegenerate} />

        <Button
          type="button"
          pill
          onClick={() =>
            action.add({
              currentStamina,
              targetStamina,
            })
          }
          disabled={disableTrack}
        >
          <AddPostIcon className="-ml-1 h-4 w-4" /> {calculators.Stamina.track}
        </Button>
      </LabeledCard>

      <ClientComponent className="md:child:w-48 lgr:grid-cols-3 child:transition-all grid gap-4 transition-all lg:grid-cols-2">
        {list.map((trackedData, index) => (
          <TrackCard
            key={trackedData.key}
            index={index}
            trackedData={trackedData}
            update={action.update}
            remove={action.remove}
          />
        ))}
        {list.length === 0 && (
          <EmptyState
            className="lgr:left-3/4 relative md:top-1/4 lg:left-1/2"
            text={{
              content: '',
              size: 0,
            }}
          />
        )}
      </ClientComponent>
    </>
  )
}

export default Stamina
