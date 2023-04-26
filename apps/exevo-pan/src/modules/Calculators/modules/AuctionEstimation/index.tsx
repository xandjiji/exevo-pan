import clsx from 'clsx'
import { useCallback, useState } from 'react'
import {
  LabeledCard,
  Button,
  NumericInput,
  LabeledTextBox,
} from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import AuctionEstimationAlerts from 'components/AuctionEstimationAlerts'
import EstimatedPriceBox from 'components/EstimatedPriceBox'
import CharacterMiniCard from 'components/CharacterMiniCard'
import CharacterModal from 'components/CharacterModal'
import { trpc } from 'lib/trpc'
import { vocation as vocationUtils } from 'data-dictionary/dist/dictionaries/vocations'
import { TibiaIcons, SearchIcon } from 'assets/svgs'
import { loadOutfitSrc } from 'utils'
import {
  vocationOptions,
  skillOptions,
  pvpOptions,
  locationOptions,
} from '../../options'
import { Skill } from '../../types'

/* @ ToDo:

- break club/axe/sword?
- charm points?
- min tc invested?

- max width / mobile
- enter/next/mobile interactions

*/

const parseNumber = (value: string) => parseInt(value, 10)

const AuctionEstimation = () => {
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
  const notPro = estimation.data?.estimatedValue === -1
  const isEmpty = list.length === 0

  return (
    <div className="grid gap-6">
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
            label="Localização do servidor"
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
                /* @ ToDo: i18n */
                name: (
                  <>
                    <TibiaIcons.BattlEye color="battleGreen" /> Verde
                  </>
                ),
                value: 'true',
              },
              {
                name: (
                  <>
                    <TibiaIcons.BattlEye color="battleYellow" /> Amarelo
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
            label="Vocation"
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

          <div className="xs:flex-row xs:gap-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <NumericInput
                label="Min skill"
                alwaysValid
                step={5}
                value={minSkill}
                onChange={setMinSkill}
                className="max-w-[64px]"
              />
              <NumericInput
                label="Max skill"
                alwaysValid
                step={5}
                value={maxSkill}
                onChange={setMaxSkill}
                className="max-w-[64px]"
              />
            </div>
            <div className="flex gap-3">
              <NumericInput
                label="Min level"
                alwaysValid
                step={50}
                value={minLevel}
                onChange={setMinLevel}
                className="max-w-[64px]"
              />
              <NumericInput
                label="Max level"
                alwaysValid
                step={50}
                value={maxLevel}
                onChange={setMaxLevel}
                className="max-w-[64px]"
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

          <Button onClick={() => estimation.refetch()} pill>
            <SearchIcon className="h-3 w-3" />
            Search
          </Button>
        </div>
      </LabeledCard>

      <LabeledTextBox
        labelText="Some similar auctions"
        className={clsx(
          'bg-background grid !px-6',
          isEmpty ? 'place-items-center !py-6' : 'grid-cols-2 gap-3 !py-4',
        )}
      >
        {isEmpty && !notPro && (
          <EmptyState text="No auctions" variant="medium" />
        )}

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
      </LabeledTextBox>

      <div className="mb-3 grid gap-6">
        <div className="flex items-center justify-between gap-6">
          {notPro && !isReset && <AuctionEstimationAlerts.ProOnly />}
          {estimation.data &&
            estimation.data.estimatedValue === undefined &&
            !isReset && <AuctionEstimationAlerts.Failed />}

          <EstimatedPriceBox
            estimatedValue={estimation.data?.estimatedValue}
            similarCount={similarCount}
            loading={isLoading || !estimation.data || isReset}
            className="child:bg-background child:justify-center ml-auto w-[120px] shrink-0"
          />
        </div>
      </div>

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
