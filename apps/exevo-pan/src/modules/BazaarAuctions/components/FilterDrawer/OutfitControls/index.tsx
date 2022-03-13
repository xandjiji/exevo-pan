import { Checkbox } from 'components/Atoms'
import { useFilters } from '../../../contexts/useFilters'
import * as S from './styles'
import { OutfitControlsProps } from './types'

const OutfitControls = ({
  disableAddons = false,
}: OutfitControlsProps): JSX.Element => {
  const { filterState, updateFilters, dispatch } = useFilters()

  const firstAddonSelected = filterState.addon === 1 || filterState.addon === 3
  const secondAddonSelected = filterState.addon === 2 || filterState.addon === 3

  return (
    <S.Wrapper>
      <S.SwitchWrapper onClick={() => updateFilters('sex', !filterState.sex)}>
        Male
        <S.Switch active={filterState.sex} />
        Female
      </S.SwitchWrapper>

      <Checkbox
        label="Addon 1"
        disabled={disableAddons}
        checked={disableAddons || firstAddonSelected}
        onClick={() => dispatch({ type: 'TOGGLE_ADDON', value: 1 })}
      />
      <Checkbox
        label="Addon 2"
        disabled={disableAddons}
        checked={disableAddons || secondAddonSelected}
        onClick={() => dispatch({ type: 'TOGGLE_ADDON', value: 2 })}
      />
    </S.Wrapper>
  )
}

export default OutfitControls
