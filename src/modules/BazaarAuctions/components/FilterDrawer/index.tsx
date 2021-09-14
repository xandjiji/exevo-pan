/* eslint-disable jsx-a11y/accessible-emoji */
import { useTranslation } from 'next-i18next'
import { memo, useMemo, useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { dequal } from 'dequal'
import { Drawer, Chip, RangeSliderInput, SliderInput } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import { useIsMounted } from 'hooks'
import { urlParametersState, debounce } from 'utils'
import { useDrawerFields, useDatabaseDispatch } from 'contexts/useDatabase'
import FilterGroup from './FilterGroup'
import * as S from './styles'
import * as Icon from './icons'
import { FilterDrawerProps } from './types'

import { toggleSet, isHistory, countActiveFilters } from './utils'
import {
  buildServerOptions,
  buildRareItemsOptions,
  imbuementOptions,
} from './options'
import { filterSchema } from './schema'

const DEBOUNCE_DELAY = 250
const { getUrlValues, setUrlValues, defaultValues } =
  urlParametersState(filterSchema)

const FilterDrawer = ({
  open,
  onClose,
  setActiveFilterCount,
  ...props
}: FilterDrawerProps): JSX.Element => {
  const { t } = useTranslation('homepage')

  const { serverData, rareItemData } = useDrawerFields()
  const { dispatch } = useDatabaseDispatch()
  const serverOptions = useMemo(
    () => buildServerOptions(serverData),
    [serverData],
  )
  const rareItemOptions = useMemo(
    () => buildRareItemsOptions(rareItemData),
    [rareItemData],
  )

  const debouncedDispatchFilters = useMemo(
    () =>
      debounce((updatedFilters: FilterState) => {
        dispatch({
          type: 'APPLY_FILTERS',
          filters: updatedFilters,
          isHistory: isHistory(),
        })
      }, DEBOUNCE_DELAY),
    [dispatch],
  )

  const [filters, setFilters] = useState<FilterState>(
    getUrlValues() as FilterState,
  )
  const [isFilterReset, setIsFilterReset] = useState<boolean>(() =>
    dequal(filters, defaultValues),
  )

  const availableServerOptions = useMemo(
    () =>
      serverOptions.filter((option) => !filters.serverSet.has(option.value)),
    [serverOptions, filters.serverSet],
  )

  const availableImbuementOptions = useMemo(
    () =>
      imbuementOptions.filter(
        (option) => !filters.imbuementsSet.has(option.value),
      ),
    [filters.imbuementsSet],
  )

  const availableRareItemOptions = useMemo(
    () =>
      rareItemOptions.filter((option) => !filters.itemSet.has(option.value)),
    [rareItemOptions, filters.itemSet],
  )

  const updateFilters = useCallback(
    (key: keyof FilterState, value: typeof filters[keyof FilterState]) =>
      setFilters((currentFilters) => {
        let updatedFilters = {} as FilterState
        if (currentFilters[key] instanceof Set) {
          updatedFilters = {
            ...currentFilters,
            [key]: toggleSet(currentFilters[key] as Set<typeof value>, value),
          }
        } else {
          updatedFilters = { ...currentFilters, [key]: value }
        }

        debouncedDispatchFilters(updatedFilters)
        return updatedFilters
      }),
    [debouncedDispatchFilters],
  )

  const toggleFilterSet = useCallback(
    (key: keyof FilterState, allOptions: Option[]) => {
      setFilters((currentFilters) => {
        let updatedFilters = {} as FilterState
        if ((currentFilters[key] as Set<string>).size < allOptions.length) {
          updatedFilters = {
            ...currentFilters,
            [key]: new Set([...allOptions.map((option) => option.value)]),
          }
        } else {
          updatedFilters = { ...currentFilters, [key]: new Set([]) }
        }

        debouncedDispatchFilters(updatedFilters)
        return updatedFilters
      })
    },
    [debouncedDispatchFilters],
  )

  useEffect(() => {
    const isReset = dequal(filters, defaultValues)
    setIsFilterReset(isReset)
    setActiveFilterCount(
      countActiveFilters(defaultValues as FilterState, filters),
    )
    setUrlValues(filters)
  }, [filters, setActiveFilterCount])

  const { pathname } = useRouter()
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isMounted) {
      setFilters(defaultValues as FilterState)
      setUrlValues(defaultValues)
    }
  }, [pathname])

  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>
        <S.HeadWrapper>
          {t('FilterDrawer.title')}
          <S.ResetButton
            disabled={isFilterReset}
            aria-hidden={isFilterReset}
            onClick={() => {
              setFilters(defaultValues as FilterState)
              setTimeout(
                () => dispatch({ type: 'RESET_TO_BASE_DATA' }),
                DEBOUNCE_DELAY,
              )
            }}
          >
            {t('FilterDrawer.resetFilters')}
            <Icon.Reset style={{ marginLeft: 8, marginRight: -4 }} />
          </S.ResetButton>
        </S.HeadWrapper>
      </Drawer.Head>
      <Drawer.Body>
        <FilterGroup
          label={t('FilterDrawer.searchNicknameLabel')}
          htmlFor="search-nickname-input"
          labelSuffix={
            <Tooltip
              offset={[0, 8]}
              placement="top"
              content={t('FilterDrawer.searchNicknameTooltip')}
            >
              <Icon.Exclamation />
            </Tooltip>
          }
        >
          <S.Input
            id="search-nickname-input"
            placeholder="Nickname"
            allowClear
            value={filters.nicknameFilter}
            onChange={(event) =>
              updateFilters('nicknameFilter', event.target.value)
            }
          />
        </FilterGroup>

        <FilterGroup label={t('FilterDrawer.vocationLabel')}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filters.vocation.has(0)}
              onClick={() => updateFilters('vocation', 0)}
            >
              <Icon.Rook />
              None
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.vocation.has(1)}
              onClick={() => updateFilters('vocation', 1)}
            >
              <Icon.Knight />
              Knight
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.vocation.has(2)}
              onClick={() => updateFilters('vocation', 2)}
            >
              <Icon.Paladin />
              Paladin
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.vocation.has(3)}
              onClick={() => updateFilters('vocation', 3)}
            >
              <Icon.Sorcerer />
              Sorcerer
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.vocation.has(4)}
              onClick={() => updateFilters('vocation', 4)}
            >
              <Icon.Druid />
              Druid
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="PvP">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filters.pvp.has(0)}
              onClick={() => updateFilters('pvp', 0)}
            >
              <Icon.Dove />
              Optional
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.pvp.has(1)}
              onClick={() => updateFilters('pvp', 1)}
            >
              <Icon.WhiteSkull />
              Open
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.pvp.has(2)}
              onClick={() => updateFilters('pvp', 2)}
            >
              <Icon.OrangeSkull />
              Retro Open
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.pvp.has(3)}
              onClick={() => updateFilters('pvp', 3)}
            >
              <Icon.RedSkull />
              Hardcore
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.pvp.has(4)}
              onClick={() => updateFilters('pvp', 4)}
            >
              <Icon.BlackSkull />
              Retro Hardcore
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="BattlEye">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filters.battleye.has(true)}
              onClick={() => updateFilters('battleye', true)}
            >
              <Icon.Status color="battleGreen" />
              {t('FilterDrawer.green')}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.battleye.has(false)}
              onClick={() => updateFilters('battleye', false)}
            >
              <Icon.Status color="battleYellow" />
              {t('FilterDrawer.yellow')}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={t('FilterDrawer.serverLocationLabel')}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filters.location.has(0)}
              onClick={() => updateFilters('location', 0)}
            >
              <Icon.EuFlag />
              EU
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.location.has(1)}
              onClick={() => updateFilters('location', 1)}
            >
              <Icon.NaFlag />
              NA
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.location.has(2)}
              onClick={() => updateFilters('location', 2)}
            >
              <Icon.BrFlag />
              BR
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Server" htmlFor="server-input">
          <S.AutocompleteInput
            id="server-input"
            aria-controls="server-list"
            placeholder={t('FilterDrawer.serverPlaceholder')}
            style={{ marginBottom: 12 }}
            itemList={availableServerOptions}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('serverSet', option.value),
              [updateFilters],
            )}
          />
          <S.ChipWrapper id="server-list">
            {[...filters.serverSet].map((server) => (
              <Chip
                key={server}
                onClose={() => updateFilters('serverSet', server)}
              >
                {server}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Level">
          <RangeSliderInput
            min={8}
            max={2000}
            value={[filters.minLevel, filters.maxLevel]}
            onChange={useCallback(
              (values: [number, number]) => {
                const [newMin, newMax] = values
                updateFilters('minLevel', newMin)
                updateFilters('maxLevel', newMax)
              },
              [updateFilters],
            )}
          />
        </FilterGroup>

        <FilterGroup label="Skill">
          <SliderInput
            aria-label={t('FilterDrawer.minSkillLabel')}
            min={10}
            max={130}
            value={filters.minSkill}
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLInputElement>) =>
                updateFilters('minSkill', parseInt(event.target.value, 10)),
              [updateFilters],
            )}
            style={{ marginBottom: 16 }}
          />
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filters.skillKey.has('magic')}
              onClick={() => updateFilters('skillKey', 'magic')}
            >
              <Icon.Magic />
              Magic
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.skillKey.has('distance')}
              onClick={() => updateFilters('skillKey', 'distance')}
            >
              <Icon.Distance />
              Distance
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.skillKey.has('club')}
              onClick={() => updateFilters('skillKey', 'club')}
            >
              <Icon.Club />
              Club
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.skillKey.has('sword')}
              onClick={() => updateFilters('skillKey', 'sword')}
            >
              <Icon.Sword />
              Sword
            </S.IconChip>
            <S.IconChip
              overrideStatus={filters.skillKey.has('axe')}
              onClick={() => updateFilters('skillKey', 'axe')}
            >
              <Icon.Axe />
              Axe
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Imbuements">
          <S.FlexWrapper>
            <S.AutocompleteInput
              id="imbuements-input"
              aria-controls="imbuements-list"
              placeholder={t('FilterDrawer.imbuementsPlaceholder')}
              itemList={availableImbuementOptions}
              onItemSelect={useCallback(
                (option: Option) =>
                  updateFilters('imbuementsSet', option.value),
                [updateFilters],
              )}
            />
            <Chip
              overrideStatus={
                filters.imbuementsSet.size === imbuementOptions.length
              }
              onClick={() => toggleFilterSet('imbuementsSet', imbuementOptions)}
            >
              {t('FilterDrawer.allImbuementsButton')}
            </Chip>
          </S.FlexWrapper>
          <S.ChipWrapper id="imbuements-list">
            {[...filters.imbuementsSet].map((imbuement) => (
              <Chip
                key={imbuement}
                onClose={() => updateFilters('imbuementsSet', imbuement)}
              >
                {imbuement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup
          label={t('FilterDrawer.rareItemsLabel')}
          htmlFor="rare-items-input"
          labelSuffix={
            <Tooltip
              offset={[0, 8]}
              placement="top"
              content={t('FilterDrawer.rareItemsTooltip')}
            >
              <Icon.Exclamation />
            </Tooltip>
          }
        >
          <S.FlexWrapper>
            <S.AutocompleteInput
              id="rare-items-input"
              aria-controls="rare-items-list"
              placeholder={t('FilterDrawer.rareItemsPlaceholder')}
              itemList={availableRareItemOptions}
              onItemSelect={useCallback(
                (option: Option) => updateFilters('itemSet', option.value),
                [updateFilters],
              )}
            />
            <Chip
              overrideStatus={filters.itemSet.size === rareItemOptions.length}
              onClick={() => toggleFilterSet('itemSet', rareItemOptions)}
            >
              {t('FilterDrawer.allItemsButton')}
            </Chip>
          </S.FlexWrapper>
          <S.ChipWrapper id="rare-items-list">
            {[...filters.itemSet].map((item) => (
              <Chip key={item} onClose={() => updateFilters('itemSet', item)}>
                {item}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={t('FilterDrawer.miscLabel')}>
          <S.ChipWrapper>
            <Tooltip content={t('FilterDrawer.favTooltip')}>
              <Chip
                overrideStatus={filters.fav}
                onClick={() => updateFilters('fav', !filters.fav)}
              >
                {t('FilterDrawer.favoritedButton')}
                <S.Emoji role="img" aria-label={t('FilterDrawer.heartEmoji')}>
                  ❤️
                </S.Emoji>
              </Chip>
            </Tooltip>
            <Tooltip
              style={{ width: 280 }}
              content={t('FilterDrawer.rareNicknamesTooltip')}
            >
              <Chip
                overrideStatus={filters.rareNick}
                onClick={() => updateFilters('rareNick', !filters.rareNick)}
              >
                {t('FilterDrawer.rareNicknamesButton')}
              </Chip>
            </Tooltip>
            <Tooltip content={t('FilterDrawer.soulwarTooltip')}>
              <Chip
                overrideStatus={filters.soulwarFilter}
                onClick={() => {
                  if (filters.soulwarFilter) {
                    updateFilters('minLevel', defaultValues.minLevel as number)
                    updateFilters('soulwarFilter', false)
                  } else {
                    updateFilters('minLevel', 250)
                    updateFilters('maxLevel', defaultValues.maxLevel as number)
                    updateFilters('soulwarFilter', true)
                  }
                }}
              >
                {t('FilterDrawer.soulwarButton')}
                <S.Emoji role="img" aria-label={t('FilterDrawer.skullEmoji')}>
                  💀
                </S.Emoji>
              </Chip>
            </Tooltip>
          </S.ChipWrapper>
        </FilterGroup>
      </Drawer.Body>
      <S.DrawerFooter />
    </Drawer>
  )
}

export default memo(FilterDrawer)
