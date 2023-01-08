import clsx from 'clsx'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { Menu } from 'components/Organisms'
import { Chip, Text } from 'components/Atoms'
import { NewIcon, PapyrusIcon, StarIcon } from 'assets/svgs'
import { formatNumberWithCommas, capitalizeFirstLetter } from 'utils'
import { useAuctions } from '../../../contexts/useAuctions'
import { useNotDefault } from './useNotDefault'
import Icons from './icons'
import { getInfo } from './utils'

const FilterControl = ({
  className,
  ...props
}: JSX.IntrinsicElements['section']) => {
  const { activeFilterCount, filterState, dispatch } = useAuctions()
  const notDefault = useNotDefault(filterState)

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

      {notDefault('biddedOnly') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'biddedOnly' })}
        >
          {/* @ ToDo: i18n */}
          ☑️ Bidded only
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
              dispatch({ type: 'TOGGLE_FILTER_SET', key: 'pvp', value: type })
            }
          >
            {Icons.Pvps[typeName]()}
            {typeName}
          </Chip>
        )
      })}

      {[...filterState.battleye].map((value) => (
        <Chip
          onClose={() =>
            dispatch({ type: 'TOGGLE_FILTER_SET', key: 'battleye', value })
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
          🌐 {server}
        </Chip>
      ))}

      {notDefault('dummy') && (
        <Chip onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'dummy' })}>
          🗿 Training dummy
        </Chip>
      )}

      {notDefault('goldPouch') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'goldPouch' })}
        >
          💰 Gold pouch
        </Chip>
      )}

      {notDefault('hireling') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'hireling' })}
        >
          💁 Hirelings
        </Chip>
      )}

      {notDefault('transferAvailable') && (
        <Chip
          onClose={() =>
            dispatch({ type: 'SET_DEFAULT', key: 'transferAvailable' })
          }
        >
          🌎 Regular world transfer
        </Chip>
      )}

      {notDefault('charmExpansion') && (
        <Chip
          onClose={() =>
            dispatch({ type: 'SET_DEFAULT', key: 'charmExpansion' })
          }
        >
          🧙‍♂️ Charm Expansion
        </Chip>
      )}

      {notDefault('preySlot') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'preySlot' })}
        >
          🎯 Prey Slot
        </Chip>
      )}

      {notDefault('huntingSlot') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'huntingSlot' })}
        >
          🏹 Hunting Task Slot
        </Chip>
      )}

      {notDefault('imbuementShrine') && (
        <Chip
          onClose={() =>
            dispatch({ type: 'SET_DEFAULT', key: 'imbuementShrine' })
          }
        >
          ⛲ Imbuement Shrine
        </Chip>
      )}

      {notDefault('rewardShrine') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'rewardShrine' })}
        >
          ⛲ Reward Shrine
        </Chip>
      )}

      {notDefault('mailbox') && (
        <Chip onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'mailbox' })}>
          📬 Mailbox
        </Chip>
      )}

      {notDefault('minLevel') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'minLevel' })}
        >
          Min level:{' '}
          <strong>{formatNumberWithCommas(filterState.minLevel)}</strong>
        </Chip>
      )}

      {notDefault('maxLevel') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'maxLevel' })}
        >
          Max level:{' '}
          <strong>{formatNumberWithCommas(filterState.maxLevel)}</strong>
        </Chip>
      )}

      {notDefault('minSkill') &&
        [...filterState.skillKey].map((skillKey) => (
          <Chip
            onClose={() =>
              dispatch({
                type: 'TOGGLE_FILTER_SET',
                key: 'skillKey',
                value: skillKey,
              })
            }
          >
            {Icons.Skill[skillKey as keyof typeof Icons.Skill]()}
            {capitalizeFirstLetter(skillKey)}:{' '}
            <strong>{filterState.minSkill}</strong>
            {notDefault('maxSkill') ? '(min)' : null}
          </Chip>
        ))}

      {notDefault('maxSkill') &&
        [...filterState.skillKey].map((skillKey) => (
          <Chip
            onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'maxSkill' })}
          >
            {Icons.Skill[skillKey as keyof typeof Icons.Skill]()}
            {capitalizeFirstLetter(skillKey)}:{' '}
            <strong>{filterState.maxSkill}</strong> (max)
          </Chip>
        ))}

      {notDefault('tcInvested') && (
        <Chip
          onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'tcInvested' })}
        >
          {/* @ ToDo: i18n */}
          <Text.TibiaCoin
            className="-mr-0.5"
            value={filterState.tcInvested}
          />{' '}
          invested
        </Chip>
      )}

      {[...filterState.outfitSet].map((outfit) => (
        <Chip
          onClose={() =>
            dispatch({
              type: 'TOGGLE_FILTER_SET',
              key: 'outfitSet',
              value: outfit,
            })
          }
        >
          👕 {outfit}
        </Chip>
      ))}

      {[...filterState.storeOutfitSet].map((outfit) => (
        <Chip
          onClose={() =>
            dispatch({
              type: 'TOGGLE_FILTER_SET',
              key: 'storeOutfitSet',
              value: outfit,
            })
          }
        >
          👕 {outfit}
        </Chip>
      ))}

      {[...filterState.mountSet].map((mount) => (
        <Chip
          onClose={() =>
            dispatch({
              type: 'TOGGLE_FILTER_SET',
              key: 'mountSet',
              value: mount,
            })
          }
        >
          🐴 {mount}
        </Chip>
      ))}

      {[...filterState.storeMountSet].map((mount) => (
        <Chip
          onClose={() =>
            dispatch({
              type: 'TOGGLE_FILTER_SET',
              key: 'storeMountSet',
              value: mount,
            })
          }
        >
          🐴 {mount}
        </Chip>
      ))}
    </section>
  )
}

export default FilterControl
