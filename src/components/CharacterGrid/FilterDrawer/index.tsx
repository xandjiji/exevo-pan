import { Drawer, Chip } from 'components/Atoms'
import FilterGroup from './FilterGroup'
import * as S from './styles'
import { FilterDrawerProps } from './types'

const FilterDrawer = ({
  open,
  onClose,
  ...props
}: FilterDrawerProps): JSX.Element => {
  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>Filters</Drawer.Head>
      <Drawer.Body>
        <FilterGroup label="Search nickname" htmlFor="search-nickname-input">
          <S.Input
            id="search-nickname-input"
            placeholder="Nickname"
            allowClear
          />
        </FilterGroup>
        <FilterGroup label="Vocation">
          <S.ChipWrapper>
            <Chip>None</Chip>
            <Chip>Knight</Chip>
            <Chip>Paladin</Chip>
            <Chip>Sorcerer</Chip>
            <Chip>Druid</Chip>
          </S.ChipWrapper>
        </FilterGroup>
        <FilterGroup label="PvP">
          <S.ChipWrapper>
            <Chip>Optional</Chip>
            <Chip>Open</Chip>
            <Chip>Retro Open</Chip>
            <Chip>Hardcore</Chip>
            <Chip>Retro Hardcore</Chip>
          </S.ChipWrapper>
        </FilterGroup>
      </Drawer.Body>
      <S.DrawerFooter />
    </Drawer>
  )
}

export default FilterDrawer
