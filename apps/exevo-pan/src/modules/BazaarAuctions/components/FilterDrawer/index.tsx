import { memo, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { dictionary as tagsDictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import { servers } from 'data-dictionary/dist/dictionaries/servers'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { skills } from 'data-dictionary/dist/dictionaries/skills'
import {
  Checkbox,
  Chip,
  Drawer,
  DrawerFooter,
  NumericInput,
} from 'components/Atoms'
import { InfoTooltip, Tooltip } from 'components/Organisms'
import { blurOnEnter, proTagsSet } from 'utils'
import { TibiaIcons } from 'assets/svgs'
import { useDrawerFields } from '../../contexts/useDrawerFields'
import { useAuctions } from '../../contexts/useAuctions'
import useFilterServers from './useFilterServers'
import useDebouncedFilter from './useDebouncedFilter'
import useOptionsSet from './useOptionsSet'
import useRareItemSet from './useRareItemSet'
import FilterGroup from './FilterGroup'
import NumberInput from './NumberInput'
import SpritePicker from './SpritePicker'
import OutfitControls from './OutfitControls'
import * as S from './atoms'
import { FilterDrawerProps } from './types'

const { VOCATION_IDS, VOCATION_NAMES } = vocation
const { PVP_TYPES, SERVER_LOCATIONS } = servers

const proTags = [...proTagsSet]
const freeTags = Object.keys(tagsDictionary).filter(
  (tag) => !proTagsSet.has(tag),
)

const FilterDrawer = ({ open, onClose, ...props }: FilterDrawerProps) => {
  const { common, homepage } = useTranslations()
  const i18n = homepage.FilterDrawer

  const { data } = useSession()
  const isPro = data?.user.proStatus ?? false

  const {
    activeServers,
    serverData,
    serverOptions: allServerOptions,
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
  const { filterState, activeFilterCount, mode, dispatch } = useAuctions()

  const isHistory = mode === 'history'

  const serverOptions = useFilterServers({
    allServerOptions,
    filterState,
    serverData,
  })

  const currentServerOptions = useMemo(
    () =>
      isHistory
        ? serverOptions
        : serverOptions.filter(({ name }) => activeServers.has(name)),
    [serverOptions, activeServers, isHistory],
  )

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
  const [maxSkill, setMaxSkill] = useDebouncedFilter({
    key: 'maxSkill',
    controlledValue: filterState.maxSkill,
  })

  const [bossPoints, setBossPoints] = useDebouncedFilter({
    key: 'bossPoints',
    controlledValue: filterState.bossPoints,
  })

  const [tcInvested, setTcInvested] = useDebouncedFilter({
    key: 'tcInvested',
    controlledValue: filterState.tcInvested,
  })

  const [minCharmPoints, setMinCharmPoints] = useDebouncedFilter({
    key: 'minCharmPoints',
    controlledValue: filterState.minCharmPoints,
  })

  const [maxCharmPoints, setMaxCharmPoints] = useDebouncedFilter({
    key: 'maxCharmPoints',
    controlledValue: filterState.maxCharmPoints,
  })

  const [achievementPoints, setAchievementPoints] = useDebouncedFilter({
    key: 'achievementPoints',
    controlledValue: filterState.achievementPoints,
  })

  const rareItems = useRareItemSet({
    rareItemData,
    currentFilterSet: filterState.auctionIds,
    setFilters: useCallback(
      (filterOptions) => dispatch({ type: 'SET_FILTERS', filterOptions }),
      [],
    ),
  })

  const sexDirectory = filterState.sex ? 'female' : 'male'
  const isFilterReset = activeFilterCount === 0

  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>
        <div className="flex w-full flex-grow items-center justify-between">
          {i18n.title}
          <button
            type="button"
            disabled={isFilterReset}
            aria-hidden={isFilterReset}
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            className="text-onPrimary flex cursor-pointer items-center rounded py-1 px-3 text-[9px] font-bold uppercase tracking-wider shadow-md transition-all hover:shadow-lg active:shadow-inner disabled:invisible disabled:opacity-0"
          >
            {i18n.resetFilters}
            <TibiaIcons.Reset style={{ marginLeft: 8, marginRight: -4 }} />
          </button>
        </div>
      </Drawer.Head>
      <Drawer.Body className="grid grid-cols-1 gap-4">
        <FilterGroup>
          <Checkbox
            label={i18n.labels.biddedOnly}
            checked={filterState.biddedOnly}
            onClick={() =>
              dispatch({ type: 'TOGGLE_FILTER', key: 'biddedOnly' })
            }
          />
        </FilterGroup>

        <FilterGroup>
          <S.Input
            id="search-nickname-input"
            label={i18n.labels.searchNickname}
            placeholder="Nickname"
            allowClear
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
          />
        </FilterGroup>

        <FilterGroup label={i18n.labels.vocation}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.NONE)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'vocation',
                  value: VOCATION_IDS.NONE,
                })
              }
            >
              <TibiaIcons.Rook />
              {VOCATION_NAMES[VOCATION_IDS.NONE]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.KNIGHT)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'vocation',
                  value: VOCATION_IDS.KNIGHT,
                })
              }
            >
              <TibiaIcons.Knight />
              {VOCATION_NAMES[VOCATION_IDS.KNIGHT]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.PALADIN)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'vocation',
                  value: VOCATION_IDS.PALADIN,
                })
              }
            >
              <TibiaIcons.Paladin />
              {VOCATION_NAMES[VOCATION_IDS.PALADIN]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.SORCERER)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'vocation',
                  value: VOCATION_IDS.SORCERER,
                })
              }
            >
              <TibiaIcons.Sorcerer />
              {VOCATION_NAMES[VOCATION_IDS.SORCERER]}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(VOCATION_IDS.DRUID)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'vocation',
                  value: VOCATION_IDS.DRUID,
                })
              }
            >
              <TibiaIcons.Druid />
              {VOCATION_NAMES[VOCATION_IDS.DRUID]}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="PvP">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.OPTIONAL.type)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'pvp',
                  value: PVP_TYPES.OPTIONAL.type,
                })
              }
            >
              <TibiaIcons.Dove />
              {PVP_TYPES.OPTIONAL.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.OPEN.type)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'pvp',
                  value: PVP_TYPES.OPEN.type,
                })
              }
            >
              <TibiaIcons.WhiteSkull />
              {PVP_TYPES.OPEN.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.RETRO.type)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'pvp',
                  value: PVP_TYPES.RETRO.type,
                })
              }
            >
              <TibiaIcons.OrangeSkull />
              {PVP_TYPES.RETRO.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(PVP_TYPES.HARDCORE.type)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'pvp',
                  value: PVP_TYPES.HARDCORE.type,
                })
              }
            >
              <TibiaIcons.RedSkull />
              {PVP_TYPES.HARDCORE.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(
                PVP_TYPES.RETRO_HARDCORE.type,
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'pvp',
                  value: PVP_TYPES.RETRO_HARDCORE.type,
                })
              }
            >
              <TibiaIcons.BlackSkull />
              {PVP_TYPES.RETRO_HARDCORE.string}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="BattlEye">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.battleye.has(true)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'battleye',
                  value: true,
                })
              }
            >
              <TibiaIcons.BattlEye color="battleGreen" />
              {i18n.green}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.battleye.has(false)}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'battleye',
                  value: false,
                })
              }
            >
              <TibiaIcons.BattlEye color="battleYellow" />
              {i18n.yellow}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={i18n.labels.serverLocation}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.location.has(
                SERVER_LOCATIONS.EUROPE.type,
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'location',
                  value: SERVER_LOCATIONS.EUROPE.type,
                })
              }
            >
              <TibiaIcons.EuFlag />
              {SERVER_LOCATIONS.EUROPE.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(
                SERVER_LOCATIONS.NORTH_AMERICA.type,
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'location',
                  value: SERVER_LOCATIONS.NORTH_AMERICA.type,
                })
              }
            >
              <TibiaIcons.NaFlag />
              {SERVER_LOCATIONS.NORTH_AMERICA.string}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(
                SERVER_LOCATIONS.SOUTH_AMERICA.type,
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'location',
                  value: SERVER_LOCATIONS.SOUTH_AMERICA.type,
                })
              }
            >
              <TibiaIcons.BrFlag />
              {SERVER_LOCATIONS.SOUTH_AMERICA.string}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup>
          <S.AutocompleteInput
            id="server-input"
            label="Server"
            aria-controls="server-list"
            placeholder={i18n.placeholders.server}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(
              currentServerOptions,
              filterState.serverSet,
            )}
            onItemSelect={useCallback(
              ({ value }: Option) =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'serverSet',
                  value,
                }),
              [],
            )}
            disabled={currentServerOptions.length === 0}
            onKeyPress={blurOnEnter}
            enterKeyHint="done"
          />
          <S.ChipWrapper id="server-list">
            {[...filterState.serverSet].map((server) => (
              <Chip
                key={server}
                onClose={() =>
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'serverSet',
                    value: server,
                  })
                }
              >
                {server}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={i18n.labels.storeItems}>
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="Training Dummy"
              checked={filterState.dummy}
              onClick={() => dispatch({ type: 'TOGGLE_FILTER', key: 'dummy' })}
            />
            <Checkbox
              label="Charm Expansion"
              checked={filterState.charmExpansion}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'charmExpansion' })
              }
            />
            <Checkbox
              label="Imbuement Shrine"
              checked={filterState.imbuementShrine}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'imbuementShrine' })
              }
            />
            <Checkbox
              label="Gold Pouch"
              checked={filterState.goldPouch}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'goldPouch' })
              }
            />
            <Checkbox
              label="Prey Slot"
              checked={filterState.preySlot}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'preySlot' })
              }
            />
            <Checkbox
              label="Reward Shrine"
              checked={filterState.rewardShrine}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'rewardShrine' })
              }
            />
            <Checkbox
              label="Hirelings"
              checked={filterState.hireling}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'hireling' })
              }
            />
            <Checkbox
              label="Hunting Task Slot"
              checked={filterState.huntingSlot}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'huntingSlot' })
              }
            />
            <Checkbox
              label="Mailbox"
              checked={filterState.mailbox}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'mailbox' })
              }
            />
            <Checkbox
              label="Regular world transfer"
              checked={filterState.transferAvailable}
              onClick={() =>
                dispatch({ type: 'TOGGLE_FILTER', key: 'transferAvailable' })
              }
            />
          </div>
        </FilterGroup>

        <FilterGroup>
          <S.DoubleColumnInput>
            <NumberInput
              min={DEFAULT_FILTER_OPTIONS.minLevel}
              max={maxLevel}
              label="Min level"
              placeholder={DEFAULT_FILTER_OPTIONS.minLevel.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.minLevel}
              initialValue={minLevel}
              dispatchValue={setMinLevel}
              enterKeyHint="next"
            />

            <NumberInput
              min={minLevel}
              label="Max level"
              placeholder={DEFAULT_FILTER_OPTIONS.maxLevel.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.maxLevel}
              initialValue={maxLevel}
              dispatchValue={setMaxLevel}
              enterKeyHint="next"
            />
          </S.DoubleColumnInput>
        </FilterGroup>

        <FilterGroup>
          <S.DoubleColumnInput className="mb-4">
            <NumberInput
              min={0}
              max={maxSkill}
              label="Min skill"
              placeholder={DEFAULT_FILTER_OPTIONS.minSkill.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.minSkill}
              initialValue={minSkill}
              dispatchValue={setMinSkill}
              enterKeyHint="next"
              step={10}
            />
            <NumberInput
              min={minSkill}
              max={DEFAULT_FILTER_OPTIONS.maxSkill}
              label="Max skill"
              placeholder={DEFAULT_FILTER_OPTIONS.maxSkill.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.maxSkill}
              initialValue={maxSkill}
              dispatchValue={setMaxSkill}
              enterKeyHint="next"
              step={10}
            />
          </S.DoubleColumnInput>

          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('magic'),
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'skillKey',
                  value: skills.getSkillKey('magic'),
                })
              }
            >
              <TibiaIcons.Magic />
              Magic
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('distance'),
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'skillKey',
                  value: skills.getSkillKey('distance'),
                })
              }
            >
              <TibiaIcons.Distance />
              Distance
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('club'),
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'skillKey',
                  value: skills.getSkillKey('club'),
                })
              }
            >
              <TibiaIcons.Club />
              Club
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('sword'),
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'skillKey',
                  value: skills.getSkillKey('sword'),
                })
              }
            >
              <TibiaIcons.Sword />
              Sword
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has(
                skills.getSkillKey('axe'),
              )}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'skillKey',
                  value: skills.getSkillKey('axe'),
                })
              }
            >
              <TibiaIcons.Axe />
              Axe
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <SpritePicker
          title="Outfits"
          searchPlaceholder="e.g, 'Golden Outfit'"
          spriteDirectory={`outfits/${sexDirectory}`}
          directorySuffix={`_${filterState.addon}`}
          filterKey="outfitSet"
          options={outfitValues}
          isPro={isPro}
        >
          <OutfitControls isPro={isPro} />
        </SpritePicker>

        <SpritePicker
          title="Store Outfits"
          searchPlaceholder="e.g, 'Retro Warrior'"
          spriteDirectory={`storeoutfits/${sexDirectory}`}
          directorySuffix="_3"
          filterKey="storeOutfitSet"
          options={storeOutfitValues}
          isPro={isPro}
        >
          <OutfitControls disableAddons isPro={isPro} />
        </SpritePicker>

        <SpritePicker
          title="Mounts"
          searchPlaceholder="e.g, 'Neon Sparkid'"
          spriteDirectory="mounts"
          filterKey="mountSet"
          options={mountValues}
          isPro={isPro}
        />

        <SpritePicker
          title="Store Mounts"
          searchPlaceholder="e.g, 'Gloomwurm'"
          spriteDirectory="storemounts"
          filterKey="storeMountSet"
          options={storeMountValues}
          isPro={isPro}
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
            label={i18n.labels.tcInvested}
            value={tcInvested}
            onChange={setTcInvested}
            placeholder="0"
            alwaysValid
            disabled={!isPro}
            className={clsx(
              'w-32',
              isPro ? 'child:text-rare child:font-bold' : 'mb-1',
            )}
          />
          {isPro ? <></> : <S.ExevoProExclusive />}
        </FilterGroup>

        <FilterGroup>
          <S.InputWrapper>
            <S.AutocompleteInput
              id="imbuements-input"
              label="Imbuements"
              aria-controls="imbuements-list"
              placeholder={i18n.placeholders.imbuements}
              itemList={useOptionsSet(
                imbuementOptions,
                filterState.imbuementsSet,
              )}
              onItemSelect={useCallback(
                ({ value }: Option) =>
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'imbuementsSet',
                    value,
                  }),
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
                dispatch({
                  type: 'TOGGLE_ALL_FILTER_SET_OPTION',
                  key: 'imbuementsSet',
                  allOptions: imbuementOptions,
                })
              }
            >
              {i18n.toggleAll.imbuements}
            </Chip>
          </S.InputWrapper>
          <S.ChipWrapper id="imbuements-list">
            {[...filterState.imbuementsSet].map((imbuement) => (
              <Chip
                key={imbuement}
                onClose={() =>
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'imbuementsSet',
                    value: imbuement,
                  })
                }
              >
                {imbuement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup className="grid gap-4">
          <S.InputWrapper style={{ marginBottom: 0 }}>
            <S.AutocompleteInput
              id="charms-input"
              label="Charms"
              aria-controls="charms-list"
              placeholder={i18n.placeholders.charms}
              itemList={useOptionsSet(charmOptions, filterState.charmsSet)}
              onItemSelect={useCallback(
                ({ value }: Option) =>
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'charmsSet',
                    value,
                  }),
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
                dispatch({
                  type: 'TOGGLE_ALL_FILTER_SET_OPTION',
                  key: 'charmsSet',
                  allOptions: charmOptions,
                })
              }
            >
              {i18n.toggleAll.charms}
            </Chip>
          </S.InputWrapper>

          <>
            {filterState.charmsSet.size > 0 && (
              <S.ChipWrapper id="charms-list">
                {[...filterState.charmsSet].map((charm) => (
                  <Chip
                    key={charm}
                    onClose={() =>
                      dispatch({
                        type: 'TOGGLE_FILTER_SET',
                        key: 'charmsSet',
                        value: charm,
                      })
                    }
                  >
                    {charm}
                  </Chip>
                ))}
              </S.ChipWrapper>
            )}
          </>

          <S.DoubleColumnInput className="!w-64">
            <NumberInput
              min={0}
              max={maxCharmPoints}
              label={i18n.labels.minCharmPoints}
              placeholder={DEFAULT_FILTER_OPTIONS.minCharmPoints.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.minCharmPoints}
              initialValue={minCharmPoints}
              dispatchValue={setMinCharmPoints}
              enterKeyHint="next"
              step={500}
            />
            <NumberInput
              min={maxCharmPoints}
              max={DEFAULT_FILTER_OPTIONS.maxCharmPoints}
              label={i18n.labels.maxCharmPoints}
              placeholder={DEFAULT_FILTER_OPTIONS.maxCharmPoints.toString()}
              defaultValue={DEFAULT_FILTER_OPTIONS.maxCharmPoints}
              initialValue={maxCharmPoints}
              dispatchValue={setMaxCharmPoints}
              enterKeyHint="next"
              step={500}
            />
          </S.DoubleColumnInput>
        </FilterGroup>

        <FilterGroup>
          <S.AutocompleteInput
            id="quest-input"
            label="Quests"
            aria-controls="quest-list"
            placeholder={i18n.placeholders.quests}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(questOptions, filterState.questSet)}
            onItemSelect={useCallback(
              ({ value }: Option) =>
                dispatch({ type: 'TOGGLE_FILTER_SET', key: 'questSet', value }),
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
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'questSet',
                    value: quest,
                  })
                }
              >
                {quest}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup>
          <NumericInput
            label="Achievement points"
            value={achievementPoints}
            onChange={setAchievementPoints}
            placeholder="0"
            alwaysValid
            className="w-32"
          />
        </FilterGroup>

        <FilterGroup>
          <S.AutocompleteInput
            id="achievement-input"
            label={i18n.labels.rareAchievements}
            aria-controls="achievement-list"
            placeholder={i18n.placeholders.achievements}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(
              achievementOptions,
              filterState.achievementSet,
            )}
            onItemSelect={useCallback(
              ({ value }: Option) =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'achievementSet',
                  value,
                }),
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
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'achievementSet',
                    value: achievement,
                  })
                }
              >
                {achievement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        {!isHistory && (
          <FilterGroup>
            <S.InputWrapper>
              <S.AutocompleteInput
                id="rare-items-input"
                label={
                  <InfoTooltip.LabelWrapper
                    className={clsx(
                      'whitespace-nowrap',
                      isPro && 'text-rare font-bold',
                    )}
                  >
                    {i18n.labels.rareItems}
                    <InfoTooltip labelSize content={i18n.tooltips.rareItems} />
                  </InfoTooltip.LabelWrapper>
                }
                aria-label={i18n.labels.rareItems}
                aria-controls="rare-items-list"
                placeholder={i18n.placeholders.rareItems}
                itemList={rareItems.itemList}
                disabled={!isPro}
                onItemSelect={
                  isPro
                    ? ({ name }) => rareItems.action.toggle(name)
                    : undefined
                }
                onKeyPress={blurOnEnter}
                enterKeyHint="done"
              />
              <Chip
                overrideStatus={rareItems.allSelected}
                onClick={isPro ? rareItems.action.toggleAll : undefined}
                gray={!isPro}
                className={clsx(!isPro && 'cursor-not-allowed')}
              >
                {i18n.toggleAll.items}
              </Chip>
            </S.InputWrapper>

            {isPro ? (
              <></>
            ) : (
              <div className="-mt-2">
                <S.ExevoProExclusive />
              </div>
            )}

            <S.ChipWrapper id="rare-items-list">
              {Object.keys(rareItems.selectedItemData).map((item) => (
                <Chip key={item} onClose={() => rareItems.action.toggle(item)}>
                  {item}
                </Chip>
              ))}
            </S.ChipWrapper>
          </FilterGroup>
        )}

        <FilterGroup label={i18n.labels.misc} style={{ border: 'none' }}>
          <S.ChipWrapper>
            {proTags.map((tag) => {
              const isActive = filterState.tags.has(tag)

              return (
                <Tooltip
                  content={<S.ExevoProExclusive />}
                  visible={isPro ? false : undefined}
                  trigger={isPro ? 'none' : 'hover'}
                  offset={[0, 6]}
                >
                  <Chip
                    key={tag}
                    overrideStatus={isActive}
                    onClick={() =>
                      isPro
                        ? dispatch({
                            type: 'TOGGLE_FILTER_SET',
                            key: 'tags',
                            value: tag,
                          })
                        : undefined
                    }
                    className={
                      isActive
                        ? 'text-surface bg-rare'
                        : 'bg-rare/50 text-onSurface'
                    }
                  >
                    {common.SpecialTags[tag as keyof typeof common.SpecialTags]}
                  </Chip>
                </Tooltip>
              )
            })}

            <Tooltip
              style={{ width: 280 }}
              offset={[0, 6]}
              content={<>{i18n.tooltips.rareNicknames}</>}
            >
              <Chip
                overrideStatus={filterState.rareNick}
                onClick={() =>
                  dispatch({ type: 'TOGGLE_FILTER', key: 'rareNick' })
                }
              >
                {i18n.rareNicknamesButton}
              </Chip>
            </Tooltip>

            {freeTags.map((tag) => (
              <Chip
                key={tag}
                overrideStatus={filterState.tags.has(tag)}
                onClick={() =>
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'tags',
                    value: tag,
                  })
                }
              >
                {common.SpecialTags[tag as keyof typeof common.SpecialTags]}
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
