import { memo, useMemo, useCallback } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { dictionary as tagsDictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import { servers } from 'data-dictionary/dist/dictionaries/servers'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { skills } from 'data-dictionary/dist/dictionaries/skills'
import {
  Drawer,
  DrawerFooter,
  Switch,
  Chip,
  Slider,
  Checkbox,
  NumericInput,
} from 'components/Atoms'
import { Tooltip, InfoTooltip } from 'components/Organisms'
import { blurOnEnter, proTagsSet } from 'utils'
import { useDrawerFields } from '../../contexts/useDrawerFields'
import { useAuctions } from '../../contexts/useAuctions'
import useFilterServers from './useFilterServers'
import useDebouncedFilter from './useDebouncedFilter'
import useOptionsSet from './useOptionsSet'
import useRareItemSet from './useRareItemSet'
import FilterGroup from './FilterGroup'
import LevelInput from './LevelInput'
import SpritePicker from './SpritePicker'
import OutfitControls from './OutfitControls'
import * as S from './atoms'
import * as Icon from './icons'
import { FilterDrawerProps } from './types'

const { VOCATION_IDS, VOCATION_NAMES } = vocation
const { PVP_TYPES, SERVER_LOCATIONS } = servers

const proTags = [...proTagsSet]
const freeTags = Object.keys(tagsDictionary).filter(
  (tag) => !proTagsSet.has(tag),
)

const FilterDrawer = ({ open, onClose, ...props }: FilterDrawerProps) => {
  const {
    translations: { common, homepage },
  } = useTranslations()

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
  const { filterState, activeFilterCount, isHistory, dispatch } = useAuctions()

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
          <Switch
            active={isHistory}
            onClick={() => dispatch({ type: 'TOGGLE_HISTORY' })}
          >
            {homepage.FilterDrawer.labels.bazaarHistory}
          </Switch>
        </FilterGroup>
        <FilterGroup>
          <Checkbox
            label={homepage.FilterDrawer.labels.biddedOnly}
            checked={filterState.biddedOnly}
            onClick={() =>
              dispatch({ type: 'TOGGLE_FILTER', key: 'biddedOnly' })
            }
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'vocation',
                  value: VOCATION_IDS.NONE,
                })
              }
            >
              <Icon.Rook />
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
              <Icon.Knight />
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
              <Icon.Paladin />
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
              <Icon.Sorcerer />
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'pvp',
                  value: PVP_TYPES.OPTIONAL.type,
                })
              }
            >
              <Icon.Dove />
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
              <Icon.WhiteSkull />
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
              <Icon.OrangeSkull />
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
              <Icon.RedSkull />
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
              <Icon.BlackSkull />
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
              <Icon.Status color="battleGreen" />
              {homepage.FilterDrawer.green}
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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

        <FilterGroup label={homepage.FilterDrawer.labels.storeItems}>
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
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setMinSkill(+event.target.value)
                setMaxSkill(DEFAULT_FILTER_OPTIONS.maxSkill)
              },
              [setMinSkill, setMaxSkill],
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
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
            label={homepage.FilterDrawer.labels.tcInvested}
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
              placeholder={homepage.FilterDrawer.placeholders.imbuements}
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
              {homepage.FilterDrawer.toggleAll.imbuements}
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
              {homepage.FilterDrawer.toggleAll.charms}
            </Chip>
          </S.InputWrapper>
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
                {homepage.FilterDrawer.toggleAll.items}
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

        <FilterGroup
          label={homepage.FilterDrawer.labels.misc}
          style={{ border: 'none' }}
        >
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
                    {common.SpecialTags[tag]}
                  </Chip>
                </Tooltip>
              )
            })}

            <Tooltip
              style={{ width: 280 }}
              offset={[0, 6]}
              content={homepage.FilterDrawer.tooltips.rareNicknames}
            >
              <Chip
                overrideStatus={filterState.rareNick}
                onClick={() =>
                  dispatch({ type: 'TOGGLE_FILTER', key: 'rareNick' })
                }
              >
                {homepage.FilterDrawer.rareNicknamesButton}
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
