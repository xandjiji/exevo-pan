import { Checkbox } from 'components/Atoms'
import { useFilters } from '../../../contexts/useFilters'
import * as S from './styles'

const OutfitControls = (): JSX.Element => {
  const { filterState, updateFilters } = useFilters()

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
        checked={firstAddonSelected}
        onClick={() => updateFilters('addon', 0)}
      />
      <Checkbox
        label="Addon 2"
        checked={secondAddonSelected}
        onClick={() => updateFilters('addon', 2)}
      />
    </S.Wrapper>
  )
}

export default OutfitControls
