/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import { LabeledCard, Button, Input, LabeledTextBox } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import AuctionEstimationAlerts from 'components/AuctionEstimationAlerts'
import EstimatedPriceBox from 'components/EstimatedPriceBox'
import CharacterMiniCard from 'components/CharacterMiniCard'
import CharacterModal from 'components/CharacterModal'
import { sortSchema } from 'shared-utils/dist/contracts/Filters/schemas'
import { trpc } from 'lib/trpc'
import { vocation as vocationUtils } from 'data-dictionary/dist/dictionaries/vocations'
import { TibiaIcons, SearchIcon } from 'assets/svgs'
import { loadOutfitSrc } from 'utils'
import { routes } from 'Constants'
import {
  vocationOptions,
  skillOptions,
  pvpOptions,
  locationOptions,
} from '../../options'
import { Skill } from '../../types'
import { ProCardSkeleton } from './ProCardSkeleton'

const parseNumber = (value: string) => parseInt(value, 10)

const historyMode: AuctionQueryMode = 'history'
const { urlKey: descendingUrlKey } = sortSchema.descendingOrder

const AuctionEstimation = () => {
  const {
    translations: { calculators },
  } = useTranslations()
  const i18n = calculators.AuctionEstimation

  const [pvp, setPvp] = useState<string>()
  const [location, setLocation] = useState<string>()
  const [battleye, setBattleye] = useState<string>()

  const [vocation, setVocation] = useState<string>()
  const [skill, setSkill] = useState<string>()
  const [minSkill, setMinSkill] = useState<number>()
  const [maxSkill, setMaxSkill] = useState<number>()
  const [minLevel, setMinLevel] = useState<number>()
  const [maxLevel, setMaxLevel] = useState<number>()

  const [characterDetails, setCharacterDetails] = useState<CharacterObject>()
  const [isReset, setIsReset] = useState(true)

  const estimation = trpc.estimateAuctionPrice.useQuery(
    {
      filterOptions: {
        pvp: pvp ? new Set([parseNumber(pvp)]) : undefined,
        location: location ? new Set([parseNumber(location)]) : undefined,
        battleye: battleye ? new Set([battleye === 'true']) : undefined,
        vocation: vocation
          ? new Set([vocationUtils.getIdByRegex(vocation)])
          : undefined,
        skillKey: skill
          ? new Set(
              {
                melee: ['axe', 'club', 'sword'],
                distance: ['distance'],
                magic: ['magic'],
              }[skill as Skill],
            )
          : undefined,
        minSkill,
        maxSkill,
        minLevel,
        maxLevel,
      },
      sortOptions: { descendingOrder: true },
      paginationOptions: { pageSize: 8 },
    },
    {
      enabled: false,
      keepPreviousData: true,
      onSettled: () => setIsReset(false),
    },
  )

  const isLoading = estimation.isFetching
  const list = isReset ? [] : estimation.data?.page ?? []
  const similarCount = estimation.data?.similarCount ?? 0
  const notPro = !isReset && estimation.data?.estimatedValue === -1
  const isEmpty = list.length === 0

  const invalidSkill =
    minSkill !== undefined && maxSkill !== undefined && minSkill > maxSkill
  const invalidLevel =
    minLevel !== undefined && maxLevel !== undefined && minLevel > maxLevel

  return (
    <div
      className={clsx(
        'mx-auto grid w-full items-start gap-6 md:max-w-[1000px] md:grid-cols-[412px_1fr]',
        !isEmpty && 'lgr:items-stretch',
      )}
    >
      <LabeledCard labelText="Character" className="grid !gap-6">
        <div className="grid gap-3">
          <ChipGroup
            label="PvP"
            toggleable
            options={pvpOptions}
            value={pvp}
            onChange={(e) => setPvp(e.target.value)}
          />
          <ChipGroup
            label={i18n.location}
            toggleable
            options={locationOptions}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <ChipGroup
            label="BattlEye"
            toggleable
            options={[
              {
                name: (
                  <>
                    <TibiaIcons.BattlEye color="battleGreen" />{' '}
                    {i18n.battleye.green}
                  </>
                ),
                value: 'true',
              },
              {
                name: (
                  <>
                    <TibiaIcons.BattlEye color="battleYellow" />{' '}
                    {i18n.battleye.yellow}
                  </>
                ),
                value: 'false',
              },
            ]}
            value={battleye}
            onChange={(e) => setBattleye(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <ChipGroup
            label={i18n.vocation}
            toggleable
            options={vocationOptions}
            value={vocation}
            onChange={(e) => setVocation(e.target.value)}
          />

          <ChipGroup
            label="Skill"
            toggleable
            options={skillOptions}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          <div className="child:shrink-0 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <div className="flex shrink-0 items-center gap-3">
              <Input
                label="Min skill"
                type="number"
                step={5}
                min={0}
                max={maxSkill}
                placeholder="0"
                value={minSkill ?? ''}
                error={invalidSkill}
                onChange={(e) => setMinSkill(+e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.code) estimation.refetch()
                }}
                className="max-w-[72px]"
              />
              <Input
                label="Max skill"
                type="number"
                step={5}
                min={minSkill}
                placeholder="150"
                value={maxSkill ?? ''}
                error={invalidSkill}
                onChange={(e) => setMaxSkill(+e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.code) estimation.refetch()
                }}
                className="max-w-[72px]"
              />
            </div>

            <div className="flex gap-3">
              <Input
                label="Min level"
                type="number"
                step={50}
                min={0}
                max={maxLevel}
                placeholder="0"
                value={minLevel ?? ''}
                error={invalidLevel}
                onChange={(e) => setMinLevel(+e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.code) estimation.refetch()
                }}
                className="max-w-[80px]"
              />
              <Input
                label="Max level"
                type="number"
                step={50}
                min={minLevel}
                placeholder="3000"
                value={maxLevel ?? ''}
                error={invalidLevel}
                onChange={(e) => setMaxLevel(+e.target.value)}
                enterKeyHint="search"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    estimation.refetch()
                    if (!e.code) e.currentTarget.blur()
                  }
                }}
                className="max-w-[80px]"
              />
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button
            hollow
            pill
            onClick={useCallback(() => {
              setPvp('')
              setLocation('')
              setBattleye('')
              setVocation('')
              setSkill('')
              setMinSkill(undefined)
              setMaxSkill(undefined)
              setMinLevel(undefined)
              setMaxLevel(undefined)
              setIsReset(true)
            }, [])}
          >
            Reset
          </Button>

          <Button
            onClick={() => estimation.refetch()}
            pill
            disabled={isLoading}
          >
            {isLoading ? (
              <div
                role="alert"
                className="loading-spinner highlight-30 h-3 w-3"
              />
            ) : (
              <SearchIcon className="h-3 w-3" />
            )}
            {i18n.search}
          </Button>
        </div>
      </LabeledCard>

      <LabeledTextBox
        labelText={i18n.similarAuctions}
        className="bg-background flex flex-col justify-between gap-2 !px-6 !py-4"
      >
        <div className={clsx('grid gap-6', isEmpty ? 'mb-2' : 'mb-4')}>
          <div className="flex flex-col-reverse gap-6 md:items-center md:justify-between lg:flex-row">
            {notPro && <AuctionEstimationAlerts.ProOnly />}
            {estimation.data &&
              estimation.data.estimatedValue === undefined &&
              !isReset && <AuctionEstimationAlerts.Failed />}

            <EstimatedPriceBox
              estimatedValue={estimation.data?.estimatedValue}
              similarCount={similarCount}
              loading={isLoading || !estimation.data || isReset}
              className="child:bg-background ml-auto w-[120px] shrink-0"
            />
          </div>
        </div>

        <div
          className={clsx(
            'grid',
            isEmpty && !notPro ? 'place-items-center' : 'lgr:grid-cols-2 gap-3',
          )}
        >
          {isEmpty && !notPro && (
            <EmptyState text={i18n.emptyState} variant="medium" />
          )}

          {notPro &&
            Array.from({ length: 4 }, (_, idx) => (
              <ProCardSkeleton key={idx} />
            ))}

          {list.map((auction) => {
            const {
              id,
              nickname,
              level,
              vocationId,
              serverData: { serverName },
              outfitId,
            } = auction

            return (
              <button
                key={id}
                type="button"
                onClick={() => setCharacterDetails(auction)}
                className="cursor-pointer text-left leading-tight"
              >
                <CharacterMiniCard
                  isCard
                  characterData={{
                    name: nickname,
                    level,
                    world: serverName,
                    vocation: vocationUtils.getPromotedName({
                      vocationId,
                      level,
                    }),
                  }}
                  outfitSrc={loadOutfitSrc(outfitId)}
                />
              </button>
            )
          })}
        </div>

        {!isEmpty && (
          <p className="text-tsm text-right">
            {templateMessage(i18n.goToHistory, {
              history: (
                <Link
                  href={`${routes.HOME}?mode=${historyMode}&${descendingUrlKey}=true`}
                  className="text-primaryHighlight whitespace-nowrap font-bold leading-relaxed"
                >
                  {i18n.history}
                </Link>
              ),
            })}
          </p>
        )}
      </LabeledTextBox>

      {characterDetails && (
        <CharacterModal
          characterData={characterDetails}
          onClose={() => setCharacterDetails(undefined)}
        />
      )}
    </div>
  )
}

export default AuctionEstimation
