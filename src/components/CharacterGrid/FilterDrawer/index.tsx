/* eslint-disable jsx-a11y/accessible-emoji */
import { useMemo, useState, useCallback, useEffect } from 'react'
import { Drawer, Chip, RangeSliderInput, SliderInput } from 'components/Atoms'
import { useDrawerFields, useDatabaseDispatch } from 'contexts/useDatabase'
import FilterGroup from './FilterGroup'
import * as S from './styles'
import * as Icon from './icons'
import { FilterDrawerProps } from './types'

import { toggleSet } from './utils'
import {
  buildServerOptions,
  buildRareItemsOptions,
  imbuementOptions,
} from './options'

const FilterDrawer = ({
  open,
  onClose,
  ...props
}: FilterDrawerProps): JSX.Element => {
  const { serverData, rareItemData } = useDrawerFields()
  const serverOptions = useMemo(
    () => buildServerOptions(serverData),
    [serverData],
  )
  const rareItemOptions = useMemo(
    () => buildRareItemsOptions(rareItemData),
    [rareItemData],
  )

  /* @ ToDo: default values come from url parameters */
  const [filters, setFilters] = useState<FilterState>({
    nicknameFilter: '',
    vocation: new Set([]),
    pvp: new Set([]),
    battleye: new Set([]),
    location: new Set([]),
    serverSet: new Set([]),
    minLevel: 8,
    maxLevel: 2000,
    minSkill: 10,
    skillKey: new Set([]),
    itemSet: new Set([]),
    fav: false,
    rareNick: false,
    soulwarFilter: false,
    imbuementsSet: new Set([]),
  })

  /* @ ToDo: fix this typing */
  const updateFilters = useCallback(
    (key: keyof FilterState, value: typeof filters[keyof FilterState]) =>
      setFilters(currentFilters => {
        if (typeof currentFilters[key] === 'object') {
          return {
            ...currentFilters,
            [key]: toggleSet(currentFilters[key] as Set<typeof value>, value),
          }
        } else {
          return { ...currentFilters, [key]: value }
        }
      }),
    [],
  )

  const { dispatch } = useDatabaseDispatch()

  useEffect(() => {
    /* @ ToDo: debounced effect */
    const isHistory = window.location.pathname === '/bazaar-history'
    dispatch({ type: 'APPLY_FILTERS', filters, isHistory })
    /* @ ToDo: add url parameters */
  }, [dispatch, filters])

  console.log(filters)

  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>Filters</Drawer.Head>
      <Drawer.Body>
        <FilterGroup label="Search nickname" htmlFor="search-nickname-input">
          <S.Input
            id="search-nickname-input"
            placeholder="Nickname"
            allowClear
            onChange={event =>
              updateFilters('nicknameFilter', event.target.value)
            }
          />
        </FilterGroup>

        <FilterGroup label="Vocation">
          <S.ChipWrapper>
            <Chip
              overrideStatus={filters.vocation.has(0)}
              onClick={() => updateFilters('vocation', 0)}
            >
              <Icon.Rook />
              None
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(1)}
              onClick={() => updateFilters('vocation', 1)}
            >
              <Icon.Knight />
              Knight
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(2)}
              onClick={() => updateFilters('vocation', 2)}
            >
              <Icon.Paladin />
              Paladin
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(3)}
              onClick={() => updateFilters('vocation', 3)}
            >
              <Icon.Sorcerer />
              Sorcerer
            </Chip>
            <Chip
              overrideStatus={filters.vocation.has(4)}
              onClick={() => updateFilters('vocation', 4)}
            >
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
            itemList={serverOptions}
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
              itemList={imbuementOptions}
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
              itemList={rareItemOptions}
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
