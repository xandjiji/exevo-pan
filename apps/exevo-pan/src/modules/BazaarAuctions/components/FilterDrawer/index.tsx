import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef, useCallback } from 'react'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { dictionary as tagsDictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import { servers } from 'data-dictionary/dist/dictionaries/servers'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { skills } from 'data-dictionary/dist/dictionaries/skills'
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

const { VOCATION_IDS, VOCATION_NAMES } = vocation
const { PVP_TYPES, SERVER_LOCATIONS } = servers

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
    toggleFilterSet,
    setFilters,
    toggleAllFilterSetOptions,
    resetFilters,
  } = useFilters()

  const [nickname, setNickname] = useDebouncedFilter({
    key: 'nicknameFilter',
    controlledValue: filterState.nicknameFilter,
  })

  const [minLevel, setMinLevel] = useDebouncedFilter({
    key: 'minLevel',
    controlledValue: filterState.minLevel,
  })

  const [maxLevel, setMaxLevel] = useDebouncedFilter({
    key: 'maxLevel',
    controlledValue: filterState.maxLevel,
  })

  const [minSkill, setMinSkill] = useDebouncedFilter({
    key: 'minSkill',
    controlledValue: filterState.minSkill,
  })

  const [bossPoints, setBossPoints] = useDebouncedFilter({
    key: 'bossPoints',
    controlledValue: filterState.bossPoints,
  })

  const [tcInvested, setTcInvested] = useDebouncedFilter({
    key: 'tcInvested',
    controlledValue: filterState.tcInvested,
  })

  const rareItems = useRareItemSet({
    rareItemData,
    currentFilterSet: filterState.auctionIds,
    setFilters,
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
            onClick={resetFilters}
            className="text-onPrimary flex cursor-pointer items-center rounded py-1 px-3 text-[9px] font-bold uppercase tracking-wider shadow-md transition-all hover:shadow-lg active:shadow-inner disabled:invisible disabled:opacity-0"
          >
            {homepage.FilterDrawer.resetFilters}
            <Icon.Reset style={{ marginLeft: 8, marginRight: -4 }} />
          </button>
        </div>
      </Drawer.Head>
      <Drawer.Body className="grid grid-cols-1 gap-4">
        <FilterGroup>
          <Checkbox
            label={homepage.FilterDrawer.labels.biddedOnly}
            checked={filterState.biddedOnly}
            onClick={() => setFilters({ biddedOnly: filterState.biddedOnly })}
          />
        </FilterGroup>

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
              overrideStatus={filterState.vocation.has(VOCATION_IDS.NONE)}
              onClick={() =>
                toggleFilterSet({ key: 'vocation', value: VOCATION_IDS.NONE })
              }
            >
              <Icon.Rook />
              {VOCATION_NAMES[VOCATION_IDS.NONE]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.KNIGHT)}
              onClick={() =>
                toggleFilterSet({ key: 'vocation', value: VOCATION_IDS.KNIGHT })
              }
            >
              <Icon.Knight />
              {VOCATION_NAMES[VOCATION_IDS.KNIGHT]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.PALADIN)}
              onClick={() =>
                toggleFilterSet({
                  key: 'vocation',
                  value: VOCATION_IDS.PALADIN,
                })
              }
            >
              <Icon.Paladin />
              {VOCATION_NAMES[VOCATION_IDS.PALADIN]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.SORCERER)}
              onClick={() =>
                toggleFilterSet({
                  key: 'vocation',
                  value: VOCATION_IDS.SORCERER,
                })
              }
            >
              <Icon.Sorcerer />
              {VOCATION_NAMES[VOCATION_IDS.SORCERER]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.DRUID)}
              onClick={() =>
                toggleFilterSet({ key: 'vocation', value: VOCATION_IDS.DRUID })
              }
            >
              <Icon.Druid />
              {VOCATION_NAMES[VOCATION_IDS.DRUID]}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="PvP">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.OPTIONAL.type)}
              onClick={() =>
                toggleFilterSet({ key: 'pvp', value: PVP_TYPES.OPTIONAL.type })
              }
            >
              <Icon.Dove />
              {PVP_TYPES.OPTIONAL.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.OPEN.type)}
              onClick={() =>
                toggleFilterSet({ key: 'pvp', value: PVP_TYPES.OPEN.type })
              }
            >
              <Icon.WhiteSkull />
              {PVP_TYPES.OPEN.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.RETRO.type)}
              onClick={() =>
                toggleFilterSet({ key: 'pvp', value: PVP_TYPES.RETRO.type })
              }
            >
              <Icon.OrangeSkull />
              {PVP_TYPES.RETRO.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.HARDCORE.type)}
              onClick={() =>
                toggleFilterSet({ key: 'pvp', value: PVP_TYPES.HARDCORE.type })
              }
            >
              <Icon.RedSkull />
              {PVP_TYPES.HARDCORE.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(
                PVP_TYPES.RETRO_HARDCORE.type,
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'pvp',
                  value: PVP_TYPES.RETRO_HARDCORE.type,
                })
              }
            >
              <Icon.BlackSkull />
              {PVP_TYPES.RETRO_HARDCORE.string}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="BattlEye">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.battleye.has(true)}
              onClick={() => toggleFilterSet({ key: 'battleye', value: true })}
            >
              <Icon.Status color="battleGreen" />
              {homepage.FilterDrawer.green}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.battleye.has(false)}
              onClick={() => toggleFilterSet({ key: 'battleye', value: false })}
            >
              <Icon.Status color="battleYellow" />
              {homepage.FilterDrawer.yellow}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={homepage.FilterDrawer.labels.serverLocation}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.location.has(
                SERVER_LOCATIONS.EUROPE.type,
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'location',
                  value: SERVER_LOCATIONS.EUROPE.type,
                })
              }
            >
              <Icon.EuFlag />
              {SERVER_LOCATIONS.EUROPE.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(
                SERVER_LOCATIONS.NORTH_AMERICA.type,
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'location',
                  value: SERVER_LOCATIONS.NORTH_AMERICA.type,
                })
              }
            >
              <Icon.NaFlag />
              {SERVER_LOCATIONS.NORTH_AMERICA.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(
                SERVER_LOCATIONS.SOUTH_AMERICA.type,
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'location',
                  value: SERVER_LOCATIONS.SOUTH_AMERICA.type,
                })
              }
            >
              <Icon.BrFlag />
              {SERVER_LOCATIONS.SOUTH_AMERICA.string}
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
              ({ value }: Option) =>
                toggleFilterSet({ key: 'serverSet', value }),
              [],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
          />
          <S.ChipWrapper id="server-list">
            {[...filterState.serverSet].map((server) => (
              <Chip
                key={server}
                onClose={() =>
                  toggleFilterSet({ key: 'serverSet', value: server })
                }
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
              onClick={() => setFilters({ dummy: !filterState.dummy })}
            />
            <Checkbox
              label="Charm Expansion"
              checked={filterState.charmExpansion}
              onClick={() =>
                setFilters({ charmExpansion: !filterState.charmExpansion })
              }
            />
            <Checkbox
              label="Imbuement Shrine"
              checked={filterState.imbuementShrine}
              onClick={() =>
                setFilters({ imbuementShrine: !filterState.imbuementShrine })
              }
            />
            <Checkbox
              label="Gold Pouch"
              checked={filterState.goldPouch}
              onClick={() => setFilters({ goldPouch: !filterState.goldPouch })}
            />
            <Checkbox
              label="Prey Slot"
              checked={filterState.preySlot}
              onClick={() => setFilters({ preySlot: !filterState.preySlot })}
            />
            <Checkbox
              label="Reward Shrine"
              checked={filterState.rewardShrine}
              onClick={() =>
                setFilters({ rewardShrine: !filterState.rewardShrine })
              }
            />
            <Checkbox
              label="Hirelings"
              checked={filterState.hireling}
              onClick={() => setFilters({ hireling: !filterState.hireling })}
            />
            <Checkbox
              label="Hunting Task Slot"
              checked={filterState.huntingSlot}
              onClick={() =>
                setFilters({ huntingSlot: !filterState.huntingSlot })
              }
            />
            <Checkbox
              label="Mailbox"
              checked={filterState.mailbox}
              onClick={() => setFilters({ mailbox: !filterState.mailbox })}
            />
            <Checkbox
              label="Regular world transfer"
              checked={filterState.transferAvailable}
              onClick={() =>
                setFilters({
                  transferAvailable: !filterState.transferAvailable,
                })
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
              [setMinSkill],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
            className="max-w-[270px]"
            style={{ marginBottom: 16 }}
          />
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('magic'),
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'skillKey',
                  value: skills.getSkillKey('magic'),
                })
              }
            >
              <Icon.Magic />
              Magic
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('distance'),
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'skillKey',
                  value: skills.getSkillKey('distance'),
                })
              }
            >
              <Icon.Distance />
              Distance
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('club'),
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'skillKey',
                  value: skills.getSkillKey('club'),
                })
              }
            >
              <Icon.Club />
              Club
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('sword'),
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'skillKey',
                  value: skills.getSkillKey('sword'),
                })
              }
            >
              <Icon.Sword />
              Sword
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('axe'),
              )}
              onClick={() =>
                toggleFilterSet({
                  key: 'skillKey',
                  value: skills.getSkillKey('axe'),
                })
              }
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
                ({ value }: Option) =>
                  toggleFilterSet({ key: 'imbuementsSet', value }),
                [],
              )}
              onKeyPress={blurOnEnter}
              enterKeyHint="done"
            />
            <Chip
              overrideStatus={
                filterState.imbuementsSet.size === imbuementOptions.length
              }
              onClick={() =>
                toggleAllFilterSetOptions('imbuementsSet', imbuementOptions)
              }
            >
              {homepage.FilterDrawer.toggleAll.imbuements}
            </Chip>
          </S.InputWrapper>
          <S.ChipWrapper id="imbuements-list">
            {[...filterState.imbuementsSet].map((imbuement) => (
              <Chip
                key={imbuement}
                onClose={() =>
                  toggleFilterSet({ key: 'imbuementsSet', value: imbuement })
                }
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
                ({ value }: Option) =>
                  toggleFilterSet({ key: 'charmsSet', value }),
                [],
              )}
              onKeyPress={blurOnEnter}
              enterKeyHint="done"
            />
            <Chip
              overrideStatus={
                filterState.charmsSet.size === charmOptions.length
              }
              onClick={() =>
                toggleAllFilterSetOptions('charmsSet', charmOptions)
              }
            >
              {homepage.FilterDrawer.toggleAll.charms}
            </Chip>
          </S.InputWrapper>
          <S.ChipWrapper id="charms-list">
            {[...filterState.charmsSet].map((charm) => (
              <Chip
                key={charm}
                onClose={() =>
                  toggleFilterSet({ key: 'charmsSet', value: charm })
                }
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
              ({ value }: Option) =>
                toggleFilterSet({ key: 'questSet', value }),
              [],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
          />
          <S.ChipWrapper id="quest-list">
            {[...filterState.questSet].map((quest) => (
              <Chip
                key={quest}
                onClose={() =>
                  toggleFilterSet({ key: 'questSet', value: quest })
                }
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
              ({ value }: Option) =>
                toggleFilterSet({ key: 'achievementSet', value }),
              [],
            )}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
          />
          <S.ChipWrapper id="achievement-list">
            {[...filterState.achievementSet].map((achievement) => (
              <Chip
                key={achievement}
                onClose={() =>
                  toggleFilterSet({ key: 'achievementSet', value: achievement })
                }
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
                onClick={() => setFilters({ rareNick: filterState.rareNick })}
              >
                {homepage.FilterDrawer.rareNicknamesButton}
              </Chip>
            </Tooltip>

            {Object.keys(tagsDictionary).map((tag) => (
              <Chip
                key={tag}
                overrideStatus={filterState.tags.has(tag)}
                onClick={() => toggleFilterSet({ key: 'tags', value: tag })}
              >
                {common.SpecialTags[tag]}
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
