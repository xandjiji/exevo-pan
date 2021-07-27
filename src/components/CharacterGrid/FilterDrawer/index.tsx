/* eslint-disable jsx-a11y/accessible-emoji */
import { Drawer, Chip, RangeSliderInput, SliderInput } from 'components/Atoms'
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

        <FilterGroup label="BattlEye">
          <S.ChipWrapper>
            <Chip>Green</Chip>
            <Chip>Yellow</Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Server location">
          <S.ChipWrapper>
            <Chip>EU</Chip>
            <Chip>NA</Chip>
            <Chip>BR</Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Server" htmlFor="server-input">
          <S.AutocompleteInput
            id="server-input"
            aria-controls="server-list"
            placeholder="Choose a server"
            style={{ marginBottom: 12 }}
            itemList={[{ name: 'Pacera', value: 'Pacera' }]}
          />
          <S.ChipWrapper id="server-list">
            <Chip>Adra</Chip>
            <Chip>Belobra</Chip>
            <Chip>Pacera</Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Level">
          <RangeSliderInput min={8} max={2000} />
        </FilterGroup>

        <FilterGroup label="Skill">
          <SliderInput
            aria-label="Minimum skill level"
            min={10}
            max={130}
            style={{ marginBottom: 16 }}
          />
          <S.ChipWrapper>
            <Chip>Magic</Chip>
            <Chip>Distance</Chip>
            <Chip>Club</Chip>
            <Chip>Sword</Chip>
            <Chip>Axe</Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Imbuements">
          <S.FlexWrapper>
            <S.AutocompleteInput
              id="imbuements-input"
              aria-controls="imbuements-list"
              placeholder="Select imbuements"
              itemList={[{ name: 'Critical Hit', value: 'Critical Hit' }]}
            />
            <Chip>All imbuements</Chip>
          </S.FlexWrapper>
          <S.ChipWrapper id="imbuements-list">
            <Chip>Critical Hit</Chip>
            <Chip>Speed</Chip>
            <Chip>Club Skill</Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Rare items">
          <S.FlexWrapper>
            <S.AutocompleteInput
              id="rare-items-input"
              aria-controls="rare-items-list"
              placeholder="Choose an item"
              itemList={[{ name: 'Ferumbras Hat', value: 'Ferumbras Hat' }]}
            />
            <Chip>All items</Chip>
          </S.FlexWrapper>
          <S.ChipWrapper id="rare-items-list">
            <Chip>Soulshroud</Chip>
            <Chip>Soulbastion</Chip>
            <Chip>Soulstealer</Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Misc">
          <S.ChipWrapper>
            <Chip>
              Favorited
              <S.Emoji role="img" aria-label="heart">
                ❤️
              </S.Emoji>
            </Chip>
            <Chip>Rare nicknames</Chip>
            <Chip>
              Soulwar available
              <S.Emoji role="img" aria-label="heart">
                💀
              </S.Emoji>
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>
      </Drawer.Body>
      <S.DrawerFooter />
    </Drawer>
  )
}

export default FilterDrawer
