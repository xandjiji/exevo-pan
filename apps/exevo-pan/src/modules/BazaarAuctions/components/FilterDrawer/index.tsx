import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef, useCallback } from 'react'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { dictionary as tagsDictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import {
  Drawer,
  DrawerFooter,
  Chip,
  Slider,
  Checkbox,
  NumericInput,
} from 'components/Atoms'
import { Tooltip, InfoTooltip } from 'components/Organisms'
import { blurOnEnter } from 'utils'
import { useDrawerFields } from '../../contexts/useDrawerFields'
import { useFilters } from '../../contexts/useFilters'
import useDebouncedFilter from './useDebouncedFilter'
import useOptionsSet from './useOptionsSet'
import useRareItemSet from './useRareItemSet'
import FilterGroup from './FilterGroup'
import LevelInput from './LevelInput'
import SpritePicker from './SpritePicker'
import OutfitControls from './OutfitControls'
import { isHistory } from './utils'
import * as S from './atoms'
import * as Icon from './icons'
import { FilterDrawerProps } from './types'

const FilterDrawer = ({ open, onClose, ...props }: FilterDrawerProps) => {
  const {
    translations: { common, homepage },
  } = useTranslations()

  const { current: historyPage } = useRef(isHistory())

  const {
    serverOptions,
    rareItemData,
    imbuementOptions,
    charmOptions,
    questOptions,
    achievementOptions,
    outfitValues,
    storeOutfitValues,
    mountValues,
    storeMountValues,
  } = useDrawerFields()
  const {
    filterState,
    activeFilterCount,
    updateFilters,
    setFilters,
    toggleAllOptions,
    dispatch,
  } = useFilters()

  const [nickname, setNickname] = useDebouncedFilter<string>(
    'nicknameFilter',
    filterState.nicknameFilter,
  )

  const [minLevel, setMinLevel] = useDebouncedFilter<number>(
    'minLevel',
    filterState.minLevel,
  )

  const [maxLevel, setMaxLevel] = useDebouncedFilter<number>(
    'maxLevel',
    filterState.maxLevel,
  )

  const [minSkill, setMinSkill] = useDebouncedFilter<number>(
    'minSkill',
    filterState.minSkill,
  )

  const [bossPoints, setBossPoints] = useDebouncedFilter<number>(
    'bossPoints',
    filterState.bossPoints,
  )

  const [tcInvested, setTcInvested] = useDebouncedFilter<number>(
    'tcInvested',
    filterState.tcInvested,
  )

  const rareItems = useRareItemSet({
    rareItemData,
    currentFilterSet: filterState.auctionIds,
    dispatch: setFilters,
  })

  const sexDirectory = filterState.sex ? 'female' : 'male'
  const isFilterReset = activeFilterCount === 0

  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>
        <div className="flex w-full flex-grow items-center justify-between">
          {homepage.FilterDrawer.title}
          <button
            type="button"
            disabled={isFilterReset}
            aria-hidden={isFilterReset}
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            className="text-onPrimary flex cursor-pointer items-center rounded py-1 px-3 text-[9px] font-bold uppercase tracking-wider shadow-md transition-all hover:shadow-lg active:shadow-inner disabled:invisible disabled:opacity-0"
          >
            {homepage.FilterDrawer.resetFilters}
            <Icon.Reset style={{ marginLeft: 8, marginRight: -4 }} />
          </button>
        </div>
      </Drawer.Head>
      <Drawer.Body className="grid grid-cols-1 gap-4">
        <FilterGroup>
          <S.Input
            id="search-nickname-input"
            label={homepage.FilterDrawer.labels.searchNickname}
            placeholder="Nickname"
            allowClear
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
            noAlert
          />
        </FilterGroup>

        <FilterGroup label={homepage.FilterDrawer.labels.vocation}>
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

        <FilterGroup label={homepage.FilterDrawer.labels.serverLocation}>
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

        <FilterGroup>
          <S.AutocompleteInput
            id="server-input"
            label="Server"
            aria-controls="server-list"
            placeholder={homepage.FilterDrawer.placeholders.server}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(serverOptions, filterState.serverSet)}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('serverSet', option.value),
              [updateFilters],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
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

        <FilterGroup label={homepage.FilterDrawer.labels.storeItems}>
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="Training Dummy"
              checked={filterState.dummy}
              onClick={() => updateFilters('dummy', !filterState.dummy)}
            />
            <Checkbox
              label="Charm Expansion"
              checked={filterState.charmExpansion}
              onClick={() =>
                updateFilters('charmExpansion', !filterState.charmExpansion)
              }
            />
            <Checkbox
              label="Imbuement Shrine"
              checked={filterState.imbuementShrine}
              onClick={() =>
                updateFilters('imbuementShrine', !filterState.imbuementShrine)
              }
            />
            <Checkbox
              label="Gold Pouch"
              checked={filterState.goldPouch}
              onClick={() => updateFilters('goldPouch', !filterState.goldPouch)}
            />
            <Checkbox
              label="Prey Slot"
              checked={filterState.preySlot}
              onClick={() => updateFilters('preySlot', !filterState.preySlot)}
            />
            <Checkbox
              label="Reward Shrine"
              checked={filterState.rewardShrine}
              onClick={() =>
                updateFilters('rewardShrine', !filterState.rewardShrine)
              }
            />
            <Checkbox
              label="Hirelings"
              checked={filterState.hireling}
              onClick={() => updateFilters('hireling', !filterState.hireling)}
            />
            <Checkbox
              label="Hunting Task Slot"
              checked={filterState.huntingSlot}
              onClick={() =>
                updateFilters('huntingSlot', !filterState.huntingSlot)
              }
            />
            <Checkbox
              label="Mailbox"
              checked={filterState.mailbox}
              onClick={() => updateFilters('mailbox', !filterState.mailbox)}
            />
            <Checkbox
              label="Regular world transfer"
              checked={filterState.transferAvailable}
              onClick={() =>
                updateFilters(
                  'transferAvailable',
                  !filterState.transferAvailable,
                )
              }
            />
          </div>
        </FilterGroup>

        <FilterGroup>
          <div className="grid w-44 grid-cols-2 gap-1.5">
            <LevelInput
              min={DEFAULT_FILTER_OPTIONS.minLevel}
              max={maxLevel}
              label="Min level"
              placeholder={DEFAULT_FILTER_OPTIONS.minLevel.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.minLevel}
              initialValue={minLevel}
              dispatchValue={setMinLevel}
              enterKeyHint="next"
              noAlert
            />

            <LevelInput
              min={minLevel}
              label="Max level"
              placeholder={DEFAULT_FILTER_OPTIONS.maxLevel.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.maxLevel}
              initialValue={maxLevel}
              dispatchValue={setMaxLevel}
              enterKeyHint="next"
              noAlert
            />
          </div>
        </FilterGroup>

        <FilterGroup>
          <Slider
            id="skill-slider"
            label="Skill"
            showInput
            aria-label={homepage.FilterDrawer.labels.minSkill}
            min={10}
            max={130}
            value={minSkill}
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLInputElement>) =>
                setMinSkill(+event.target.value),
              [updateFilters],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
            className="max-w-[270px]"
            style={{ marginBottom: 16 }}
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

        <SpritePicker
          title="Outfits"
          spriteDirectory={`outfits/${sexDirectory}`}
          directorySuffix={`_${filterState.addon}`}
          filterKey="outfitSet"
          options={outfitValues}
        >
          <OutfitControls />
        </SpritePicker>

        <SpritePicker
          title="Store Outfits"
          spriteDirectory={`storeoutfits/${sexDirectory}`}
          directorySuffix="_3"
          filterKey="storeOutfitSet"
          options={storeOutfitValues}
        >
          <OutfitControls disableAddons />
        </SpritePicker>

        <SpritePicker
          title="Mounts"
          spriteDirectory="mounts"
          filterKey="mountSet"
          options={mountValues}
        />

        <SpritePicker
          title="Store Mounts"
          spriteDirectory="storemounts"
          filterKey="storeMountSet"
          options={storeMountValues}
        />

        <FilterGroup>
          <NumericInput
            label="Boss points"
            value={bossPoints}
            onChange={setBossPoints}
            placeholder="0"
            alwaysValid
            className="w-32"
          />
        </FilterGroup>

        <FilterGroup>
          <NumericInput
            label={homepage.FilterDrawer.labels.tcInvested}
            value={tcInvested}
            onChange={setTcInvested}
            placeholder="0"
            alwaysValid
            className="w-32"
          />
        </FilterGroup>

        <FilterGroup>
          <S.InputWrapper>
            <S.AutocompleteInput
              id="imbuements-input"
              label="Imbuements"
              aria-controls="imbuements-list"
              placeholder={homepage.FilterDrawer.placeholders.imbuements}
              itemList={useOptionsSet(
                imbuementOptions,
                filterState.imbuementsSet,
              )}
              onItemSelect={useCallback(
                (option: Option) =>
                  updateFilters('imbuementsSet', option.value),
                [updateFilters],
              )}
              onKeyPress={blurOnEnter}
              enterKeyHint="done"
            />
            <Chip
              overrideStatus={
                filterState.imbuementsSet.size === imbuementOptions.length
              }
              onClick={() =>
                toggleAllOptions('imbuementsSet', imbuementOptions)
              }
            >
              {homepage.FilterDrawer.toggleAll.imbuements}
            </Chip>
          </S.InputWrapper>
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

        <FilterGroup>
          <S.InputWrapper>
            <S.AutocompleteInput
              id="charms-input"
              label="Charms"
              aria-controls="charms-list"
              placeholder={homepage.FilterDrawer.placeholders.charms}
              itemList={useOptionsSet(charmOptions, filterState.charmsSet)}
              onItemSelect={useCallback(
                (option: Option) => updateFilters('charmsSet', option.value),
                [updateFilters],
              )}
              onKeyPress={blurOnEnter}
              enterKeyHint="done"
            />
            <Chip
              overrideStatus={
                filterState.charmsSet.size === charmOptions.length
              }
              onClick={() => toggleAllOptions('charmsSet', charmOptions)}
            >
              {homepage.FilterDrawer.toggleAll.charms}
            </Chip>
          </S.InputWrapper>
          <S.ChipWrapper id="charms-list">
            {[...filterState.charmsSet].map((charm) => (
              <Chip
                key={charm}
                onClose={() => updateFilters('charmsSet', charm)}
              >
                {charm}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup>
          <S.AutocompleteInput
            id="quest-input"
            label="Quests"
            aria-controls="quest-list"
            placeholder={homepage.FilterDrawer.placeholders.quests}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(questOptions, filterState.questSet)}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('questSet', option.value),
              [updateFilters],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
          />
          <S.ChipWrapper id="quest-list">
            {[...filterState.questSet].map((quest) => (
              <Chip
                key={quest}
                onClose={() => updateFilters('questSet', quest)}
              >
                {quest}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup>
          <S.AutocompleteInput
            id="achievement-input"
            label={homepage.FilterDrawer.labels.rareAchievements}
            aria-controls="achievement-list"
            placeholder={homepage.FilterDrawer.placeholders.achievements}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(
              achievementOptions,
              filterState.achievementSet,
            )}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('achievementSet', option.value),
              [updateFilters],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
          />
          <S.ChipWrapper id="achievement-list">
            {[...filterState.achievementSet].map((achievement) => (
              <Chip
                key={achievement}
                onClose={() => updateFilters('achievementSet', achievement)}
              >
                {achievement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        {!historyPage && (
          <FilterGroup>
            <S.InputWrapper>
              <S.AutocompleteInput
                id="rare-items-input"
                label={
                  <InfoTooltip.LabelWrapper className="whitespace-nowrap">
                    {homepage.FilterDrawer.labels.rareItems}
                    <InfoTooltip
                      labelSize
                      content={homepage.FilterDrawer.tooltips.rareItems}
                    />
                  </InfoTooltip.LabelWrapper>
                }
                aria-label={homepage.FilterDrawer.labels.rareItems}
                aria-controls="rare-items-list"
                placeholder={homepage.FilterDrawer.placeholders.rareItems}
                itemList={rareItems.itemList}
                onItemSelect={({ name }) => rareItems.action.toggle(name)}
                onKeyPress={blurOnEnter}
                enterKeyHint="done"
              />
              <Chip
                overrideStatus={rareItems.allSelected}
                onClick={rareItems.action.toggleAll}
              >
                {homepage.FilterDrawer.toggleAll.items}
              </Chip>
            </S.InputWrapper>
            <S.ChipWrapper id="rare-items-list">
              {Object.keys(rareItems.selectedItemData).map((item) => (
                <Chip key={item} onClose={() => rareItems.action.toggle(item)}>
                  {item}
                </Chip>
              ))}
            </S.ChipWrapper>
          </FilterGroup>
        )}

        <FilterGroup
          label={homepage.FilterDrawer.labels.misc}
          style={{ border: 'none' }}
        >
          <S.ChipWrapper>
            <Tooltip
              style={{ width: 280 }}
              content={homepage.FilterDrawer.tooltips.rareNicknames}
            >
              <Chip
                overrideStatus={filterState.rareNick}
                onClick={() => updateFilters('rareNick', !filterState.rareNick)}
              >
                {homepage.FilterDrawer.rareNicknamesButton}
              </Chip>
            </Tooltip>

            {Object.keys(tagsDictionary).map((tag) => (
              <Chip
                key={tag}
                overrideStatus={filterState.tags.has(tag)}
                onClick={() => updateFilters('tags', tag)}
              >
                {common.SpecialTags[tag] ?? tag}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>
      </Drawer.Body>
      <DrawerFooter className="flex-none" />
    </Drawer>
  )
}

export default memo(FilterDrawer)
