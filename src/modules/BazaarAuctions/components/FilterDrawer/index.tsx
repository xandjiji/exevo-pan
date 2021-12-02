/* eslint-disable jsx-a11y/accessible-emoji */
import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef, useCallback } from 'react'
import { Drawer, Chip, RangeSliderInput } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import { useDrawerFields } from '../../contexts/useDrawerFields'
import { useFilters } from '../../contexts/useFilters'
import useDebouncedFilter from './useDebouncedFilter'
import useOptionsSet from './useOptionsSet'
import FilterGroup from './FilterGroup'
import { isHistory } from './utils'
import * as S from './styles'
import * as Icon from './icons'
import { FilterDrawerProps } from './types'

const FilterDrawer = ({
  open,
  onClose,
  ...props
}: FilterDrawerProps): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { current: historyPage } = useRef(isHistory())

  const { serverOptions, auctionedItemOptions, imbuementOptions } =
    useDrawerFields()
  const {
    filterState,
    defaultValues,
    activeFilterCount,
    updateFilters,
    toggleAllOptions,
    dispatch,
  } = useFilters()

  const [nickname, setNickname] = useDebouncedFilter<string>(
    'nicknameFilter',
    filterState.nicknameFilter,
  )

  const isFilterReset = activeFilterCount === 0

  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>
        <S.HeadWrapper>
          {homepage.FilterDrawer.title}
          <S.ResetButton
            disabled={isFilterReset}
            aria-hidden={isFilterReset}
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          >
            {homepage.FilterDrawer.resetFilters}
            <Icon.Reset style={{ marginLeft: 8, marginRight: -4 }} />
          </S.ResetButton>
        </S.HeadWrapper>
      </Drawer.Head>
      <Drawer.Body>
        <FilterGroup
          label={homepage.FilterDrawer.searchNicknameLabel}
          htmlFor="search-nickname-input"
        >
          <S.Input
            id="search-nickname-input"
            placeholder="Nickname"
            allowClear
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </FilterGroup>

        <FilterGroup label={homepage.FilterDrawer.vocationLabel}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.vocation.has(0)}
              onClick={() => updateFilters('vocation', 0)}
            >
              <Icon.Rook />
              None
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(1)}
              onClick={() => updateFilters('vocation', 1)}
            >
              <Icon.Knight />
              Knight
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(2)}
              onClick={() => updateFilters('vocation', 2)}
            >
              <Icon.Paladin />
              Paladin
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(3)}
              onClick={() => updateFilters('vocation', 3)}
            >
              <Icon.Sorcerer />
              Sorcerer
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(4)}
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
              overrideStatus={filterState.pvp.has(0)}
              onClick={() => updateFilters('pvp', 0)}
            >
              <Icon.Dove />
              Optional
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(1)}
              onClick={() => updateFilters('pvp', 1)}
            >
              <Icon.WhiteSkull />
              Open
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(2)}
              onClick={() => updateFilters('pvp', 2)}
            >
              <Icon.OrangeSkull />
              Retro Open
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(3)}
              onClick={() => updateFilters('pvp', 3)}
            >
              <Icon.RedSkull />
              Hardcore
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(4)}
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
              overrideStatus={filterState.battleye.has(true)}
              onClick={() => updateFilters('battleye', true)}
            >
              <Icon.Status color="battleGreen" />
              {homepage.FilterDrawer.green}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.battleye.has(false)}
              onClick={() => updateFilters('battleye', false)}
            >
              <Icon.Status color="battleYellow" />
              {homepage.FilterDrawer.yellow}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={homepage.FilterDrawer.serverLocationLabel}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.location.has(0)}
              onClick={() => updateFilters('location', 0)}
            >
              <Icon.EuFlag />
              EU
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(1)}
              onClick={() => updateFilters('location', 1)}
            >
              <Icon.NaFlag />
              NA
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(2)}
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
            placeholder={homepage.FilterDrawer.serverPlaceholder}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(serverOptions, filterState.serverSet)}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('serverSet', option.value),
              [updateFilters],
            )}
          />
          <S.ChipWrapper id="server-list">
            {[...filterState.serverSet].map((server) => (
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
            value={[filterState.minLevel, filterState.maxLevel]}
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
          <S.RangeSliderInput
            aria-label={homepage.FilterDrawer.minSkillLabel}
            min={10}
            max={150}
            value={[filterState.minSkill, filterState.maxSkill]}
            onChange={useCallback(
              (values: [number, number]) => {
                const [newMin, newMax] = values
                updateFilters('minSkill', newMin)
                updateFilters('maxSkill', newMax)
              },
              [updateFilters],
            )}
          />
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('magic')}
              onClick={() => updateFilters('skillKey', 'magic')}
            >
              <Icon.Magic />
              Magic
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('distance')}
              onClick={() => updateFilters('skillKey', 'distance')}
            >
              <Icon.Distance />
              Distance
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('club')}
              onClick={() => updateFilters('skillKey', 'club')}
            >
              <Icon.Club />
              Club
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('sword')}
              onClick={() => updateFilters('skillKey', 'sword')}
            >
              <Icon.Sword />
              Sword
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('axe')}
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
              placeholder={homepage.FilterDrawer.imbuementsPlaceholder}
              itemList={useOptionsSet(
                imbuementOptions,
                filterState.imbuementsSet,
              )}
              onItemSelect={useCallback(
                (option: Option) =>
                  updateFilters('imbuementsSet', option.value),
                [updateFilters],
              )}
            />
            <Chip
              overrideStatus={
                filterState.imbuementsSet.size === imbuementOptions.length
              }
              onClick={() =>
                toggleAllOptions('imbuementsSet', imbuementOptions)
              }
            >
              {homepage.FilterDrawer.allImbuementsButton}
            </Chip>
          </S.FlexWrapper>
          <S.ChipWrapper id="imbuements-list">
            {[...filterState.imbuementsSet].map((imbuement) => (
              <Chip
                key={imbuement}
                onClose={() => updateFilters('imbuementsSet', imbuement)}
              >
                {imbuement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        {!historyPage && (
          <FilterGroup
            label={homepage.FilterDrawer.rareItemsLabel}
            htmlFor="rare-items-input"
            labelSuffix={
              <Tooltip
                offset={[0, 8]}
                placement="top"
                content={homepage.FilterDrawer.rareItemsTooltip}
              >
                <Icon.Exclamation />
              </Tooltip>
            }
          >
            <S.FlexWrapper>
              <S.AutocompleteInput
                id="rare-items-input"
                aria-controls="rare-items-list"
                placeholder={homepage.FilterDrawer.rareItemsPlaceholder}
                itemList={useOptionsSet(
                  auctionedItemOptions,
                  filterState.itemSet,
                )}
                onItemSelect={useCallback(
                  (option: Option) => updateFilters('itemSet', option.value),
                  [updateFilters],
                )}
              />
              <Chip
                overrideStatus={
                  filterState.itemSet.size === auctionedItemOptions.length
                }
                onClick={() =>
                  toggleAllOptions('itemSet', auctionedItemOptions)
                }
              >
                {homepage.FilterDrawer.allItemsButton}
              </Chip>
            </S.FlexWrapper>
            <S.ChipWrapper id="rare-items-list">
              {[...filterState.itemSet].map((item) => (
                <Chip key={item} onClose={() => updateFilters('itemSet', item)}>
                  {item}
                </Chip>
              ))}
            </S.ChipWrapper>
          </FilterGroup>
        )}

        <FilterGroup label={homepage.FilterDrawer.miscLabel}>
          <S.ChipWrapper>
            <Tooltip
              style={{ width: 280 }}
              content={homepage.FilterDrawer.rareNicknamesTooltip}
            >
              <Chip
                overrideStatus={filterState.rareNick}
                onClick={() => updateFilters('rareNick', !filterState.rareNick)}
              >
                {homepage.FilterDrawer.rareNicknamesButton}
              </Chip>
            </Tooltip>
            <Tooltip content={homepage.FilterDrawer.soulwarTooltip}>
              <Chip
                overrideStatus={filterState.soulwarFilter}
                onClick={() => {
                  if (filterState.soulwarFilter) {
                    updateFilters('minLevel', defaultValues.minLevel as number)
                    updateFilters('soulwarFilter', false)
                  } else {
                    updateFilters('minLevel', 250)
                    updateFilters('maxLevel', defaultValues.maxLevel as number)
                    updateFilters('soulwarFilter', true)
                  }
                }}
              >
                {homepage.FilterDrawer.soulwarButton}
                <S.Emoji
                  role="img"
                  aria-label={homepage.FilterDrawer.skullEmoji}
                >
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
