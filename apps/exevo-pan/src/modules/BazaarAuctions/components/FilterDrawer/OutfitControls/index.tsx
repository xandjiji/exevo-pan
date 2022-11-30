/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Switch, Checkbox } from 'components/Atoms'
import clsx from 'clsx'
import { useAuctions } from '../../../contexts/useAuctions'
import styles from './styles.module.css'
import { OutfitControlsProps } from './types'

const OutfitControls = ({
  isPro = false,
  disableAddons = false,
}: OutfitControlsProps) => {
  const { filterState, dispatch } = useAuctions()

  const firstAddonSelected = filterState.addon === 1 || filterState.addon === 3
  const secondAddonSelected = filterState.addon === 2 || filterState.addon === 3

  return (
    <div className="mt-1.5 mb-2 flex w-full flex-wrap items-center gap-3.5">
      <div
        onClick={
          isPro
            ? () => dispatch({ type: 'TOGGLE_FILTER', key: 'sex' })
            : undefined
        }
        className={clsx(
          'text-tsm mr-4 flex w-full items-center gap-2',
          isPro ? 'cursor-pointer' : 'cursor-not-allowed',
          styles.switchWrapper,
        )}
      >
        Male
        <Switch active={filterState.sex} disabled={!isPro} />
        Female
      </div>

      <Checkbox
        label="Addon 1"
        disabled={!isPro || disableAddons}
        checked={disableAddons || firstAddonSelected}
        onClick={() => dispatch({ type: 'TOGGLE_ADDON', value: 1 })}
      />
      <Checkbox
        label="Addon 2"
        disabled={!isPro || disableAddons}
        checked={disableAddons || secondAddonSelected}
        onClick={() => dispatch({ type: 'TOGGLE_ADDON', value: 2 })}
      />
    </div>
  )
}

export default OutfitControls
