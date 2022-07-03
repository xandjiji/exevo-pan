import { useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { TimeInput, Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { ClientComponent } from 'components/Organisms'
import ChevronRight from 'assets/svgs/chevronRight.svg'
import AddIcon from 'assets/svgs/addPost.svg'
import useTime from './useTime'
import TimeLeft from './TimeLeft'
import StaminaBar from './StaminaBar'
import TrackCard from './TrackCard'
import useTracking from './useTracking'
import { calculateSecondsToRegenerate } from './utils'
import { Main, LabeledCard } from '../../components'

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
    <Main className="md:child:shrink-0 items-start gap-6 md:flex">
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
          <ChevronRight
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
            error={invalid}
            className="child:w-full child:whitespace-nowrap w-full"
            noAlert
          />
        </div>

        <StaminaBar time={currentStamina.time} mark={targetStamina.time} />

        <TimeLeft secondsToRegenerate={secondsToRegenerate} />

        <Button
          type="button"
          style={{ padding: '5px 16px' }}
          onClick={() =>
            action.add({
              currentStamina,
              targetStamina,
            })
          }
          disabled={disableTrack}
        >
          <div className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider">
            <AddIcon
              className={clsx('-ml-1 h-4 w-4', !invalid && 'fill-onPrimary')}
            />{' '}
            {calculators.Stamina.track}
          </div>
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
            className="lgr:left-3/4 relative select-none md:top-1/4 lg:left-1/2"
            text={{
              content: '',
              size: 0,
            }}
          />
        )}
      </ClientComponent>
    </Main>
  )
}

export default Stamina
