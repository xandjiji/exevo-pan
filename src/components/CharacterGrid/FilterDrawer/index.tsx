/* eslint-disable jsx-a11y/accessible-emoji */
import { Drawer, Chip, RangeSliderInput, SliderInput } from 'components/Atoms'
import FilterGroup from './FilterGroup'
import * as S from './styles'
import * as Icon from './icons'
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
            <Chip>
              <Icon.Rook />
              None
            </Chip>
            <Chip>
              <Icon.Knight />
              Knight
            </Chip>
            <Chip>
              <Icon.Paladin />
              Paladin
            </Chip>
            <Chip>
              <Icon.Sorcerer />
              Sorcerer
            </Chip>
            <Chip>
              <Icon.Druid />
              Druid
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="PvP">
          <S.ChipWrapper>
            <Chip>
              <Icon.Dove />
              Optional
            </Chip>
            <Chip>
              <Icon.WhiteSkull />
              Open
            </Chip>
            <Chip>
              <Icon.OrangeSkull />
              Retro Open
            </Chip>
            <Chip>
              <Icon.RedSkull />
              Hardcore
            </Chip>
            <Chip>
              <Icon.BlackSkull />
              Retro Hardcore
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="BattlEye">
          <S.ChipWrapper>
            <Chip>
              <Icon.Status color="battleGreen" />
              Green
            </Chip>
            <Chip>
              <Icon.Status color="battleYellow" />
              Yellow
            </Chip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Server location">
          <S.ChipWrapper>
            <Chip>
              <Icon.EuFlag />
              EU
            </Chip>
            <Chip>
              <Icon.NaFlag />
              NA
            </Chip>
            <Chip>
              <Icon.BrFlag />
              BR
            </Chip>
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
            <Chip>
              <Icon.Magic />
              Magic
            </Chip>
            <Chip>
              <Icon.Distance />
              Distance
            </Chip>
            <Chip>
              <Icon.Club />
              Club
            </Chip>
            <Chip>
              <Icon.Sword />
              Sword
            </Chip>
            <Chip>
              <Icon.Axe />
              Axe
            </Chip>
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
