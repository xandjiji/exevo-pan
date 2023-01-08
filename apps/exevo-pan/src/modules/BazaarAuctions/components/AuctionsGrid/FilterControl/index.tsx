import clsx from 'clsx'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { Menu } from 'components/Organisms'
import { Chip } from 'components/Atoms'
import { NewIcon, PapyrusIcon, StarIcon } from 'assets/svgs'
import { useAuctions } from '../../../contexts/useAuctions'
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
      <div className={clsx(activeFilterCount > 0 && 'mr-1 mb-1')}>
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

      {[...filterState.vocation].map((vocationId) => (
        <Chip
          onClose={() =>
            dispatch({
              type: 'TOGGLE_FILTER_SET',
              key: 'vocation',
              value: vocationId,
            })
          }
        >
          {vocation.getVocationName(vocationId)}
        </Chip>
      ))}

      {[...filterState.pvp].map((type) => (
        <Chip
          onClose={() =>
            dispatch({
              type: 'TOGGLE_FILTER_SET',
              key: 'pvp',
              value: type,
            })
          }
        >
          {getInfo.pvp(type)}
        </Chip>
      ))}

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
            {value ? 'Green' : 'Yellow'}
          </Chip>
        ))}

      {[...filterState.location].map((type) => (
        <Chip
          onClose={() =>
            dispatch({
              type: 'TOGGLE_FILTER_SET',
              key: 'location',
              value: type,
            })
          }
        >
          {getInfo.location(type)}
        </Chip>
      ))}

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
    </section>
  )
}

export default FilterControl
