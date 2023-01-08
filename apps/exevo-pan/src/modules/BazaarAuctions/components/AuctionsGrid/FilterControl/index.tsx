import clsx from 'clsx'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { Menu } from 'components/Organisms'
import { Chip, Text } from 'components/Atoms'
import { NewIcon, PapyrusIcon, StarIcon } from 'assets/svgs'
import { formatNumberWithCommas } from 'utils'
import { useAuctions } from '../../../contexts/useAuctions'
import Icons from './icons'
import { getInfo } from './utils'

const FilterControl = ({
  className,
  ...props
}: JSX.IntrinsicElements['section']) => {
  const { activeFilterCount, filterState, dispatch } = useAuctions()

  return (
    <section
      className={clsx(className, 'flex flex-wrap items-center gap-2')}
      {...props}
    >
      <div className={clsx(activeFilterCount > 0 && 'mr-1')}>
        <Menu
          offset={[0, 8]}
          placement="bottom-start"
          items={[
            {
              label: 'Current auctions',
              icon: NewIcon,
            },
            {
              label: 'Auction history',
              icon: PapyrusIcon,
            },
            {
              label: 'Favorites',
              icon: StarIcon,
            },
          ]}
          variant="button"
        >
          Current auctions
        </Menu>
      </div>

      {filterState.biddedOnly && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { biddedOnly: false },
            })
          }
        >
          Bidded only
        </Chip>
      )}

      {[...filterState.vocation].map((vocationId) => {
        const vocationName = vocation.getVocationName(vocationId)

        return (
          <Chip
            onClose={() =>
              dispatch({
                type: 'TOGGLE_FILTER_SET',
                key: 'vocation',
                value: vocationId,
              })
            }
          >
            {Icons.Vocations[vocationName]()}
            {vocationName}
          </Chip>
        )
      })}

      {[...filterState.pvp].map((type) => {
        const typeName = getInfo.pvp(type)
        return (
          <Chip
            onClose={() =>
              dispatch({
                type: 'TOGGLE_FILTER_SET',
                key: 'pvp',
                value: type,
              })
            }
          >
            {Icons.Pvps[typeName]()}
            {typeName}
          </Chip>
        )
      })}

      {filterState.battleye.size === 1 &&
        [...filterState.battleye].map((value) => (
          <Chip
            onClose={() =>
              dispatch({
                type: 'SET_FILTERS',
                filterOptions: { battleye: new Set([]) },
              })
            }
          >
            <Icons.Battleye color={value ? 'battleGreen' : 'battleYellow'} />
            {value ? 'Green' : 'Yellow'}
          </Chip>
        ))}

      {[...filterState.location].map((type) => {
        const typeName = getInfo.location(type)

        return (
          <Chip
            onClose={() =>
              dispatch({
                type: 'TOGGLE_FILTER_SET',
                key: 'location',
                value: type,
              })
            }
          >
            {Icons.Location[typeName]()}
            {typeName}
          </Chip>
        )
      })}

      {[...filterState.serverSet].map((server) => (
        <Chip
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

      {filterState.dummy && (
        <Chip
          onClose={() =>
            dispatch({ type: 'SET_FILTERS', filterOptions: { dummy: false } })
          }
        >
          Training dummy
        </Chip>
      )}

      {filterState.goldPouch && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { goldPouch: false },
            })
          }
        >
          Gold pouch
        </Chip>
      )}

      {filterState.hireling && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { hireling: false },
            })
          }
        >
          Hirelings
        </Chip>
      )}

      {filterState.transferAvailable && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { transferAvailable: false },
            })
          }
        >
          Regular world transfer
        </Chip>
      )}

      {filterState.charmExpansion && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { charmExpansion: false },
            })
          }
        >
          Charm Expansion
        </Chip>
      )}

      {filterState.preySlot && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { preySlot: false },
            })
          }
        >
          Prey Slot
        </Chip>
      )}

      {filterState.huntingSlot && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { huntingSlot: false },
            })
          }
        >
          Hunting Task Slot
        </Chip>
      )}

      {filterState.imbuementShrine && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { imbuementShrine: false },
            })
          }
        >
          Imbuement Shrine
        </Chip>
      )}

      {filterState.rewardShrine && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { rewardShrine: false },
            })
          }
        >
          Reward Shrine
        </Chip>
      )}

      {filterState.mailbox && (
        <Chip
          onClose={() =>
            dispatch({
              type: 'SET_FILTERS',
              filterOptions: { mailbox: false },
            })
          }
        >
          Mailbox
        </Chip>
      )}

      {filterState.minLevel > 0 && (
        <Chip
          onClose={() =>
            dispatch({ type: 'SET_FILTERS', filterOptions: { minLevel: 0 } })
          }
        >
          Min level: <strong>{filterState.minLevel}</strong>
        </Chip>
      )}

      {filterState.maxLevel > 0 && (
        <Chip
          onClose={() =>
            dispatch({ type: 'SET_FILTERS', filterOptions: { maxLevel: 0 } })
          }
        >
          Max level: <strong>{filterState.maxLevel}</strong>
        </Chip>
      )}

      {filterState.tcInvested > 0 && (
        <Chip
          onClose={() =>
            dispatch({ type: 'SET_FILTERS', filterOptions: { tcInvested: 0 } })
          }
        >
          {/* @ ToDo: i18n */}
          <Text.TibiaCoin
            className="-mr-0.5"
            value={filterState.tcInvested}
          />{' '}
          invested
        </Chip>
      )}
    </section>
  )
}

export default FilterControl
