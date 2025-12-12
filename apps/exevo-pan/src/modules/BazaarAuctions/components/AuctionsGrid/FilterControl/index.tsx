import clsx from 'clsx'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { useTranslations } from 'contexts/useTranslation'
import { Menu } from 'components/Organisms'
import { Checkbox, Text } from 'components/Atoms'
import { NewIcon, PapyrusIcon, StarIcon } from 'assets/svgs'
import { capitalizeFirstLetter, formatNumberWithCommas } from 'utils'
import { useDrawerFields } from '../../../contexts/useDrawerFields'
import { useAuctions } from '../../../contexts/useAuctions'
import { useNotDefault } from './useNotDefault'
import * as S from './atoms'
import Icons from './icons'
import { getInfo } from './utils'

const FilterControl = ({
  className,
  ...props
}: JSX.IntrinsicElements['section']) => {
  const { common, homepage } = useTranslations()

  const { imbuementOptions } = useDrawerFields()
  const { activeFilterCount, filterState, mode, dispatch } = useAuctions()
  const notDefault = useNotDefault(filterState)

  return (
    <section
      id="filter-control"
      className={clsx(className, 'flex flex-wrap items-center gap-2')}
      {...props}
    >
      <div className={clsx(activeFilterCount > 0 && 'mr-1')}>
        <Menu
          offset={[0, 8]}
          placement="bottom-start"
          items={[
            {
              label: homepage.FilterControl.modes.current,
              icon: NewIcon,
              onSelect: () => dispatch({ type: 'SET_MODE', mode: 'current' }),
            },
            {
              label: homepage.FilterControl.modes.history,
              icon: PapyrusIcon,
              onSelect: () => dispatch({ type: 'SET_MODE', mode: 'history' }),
            },
            {
              label: homepage.FilterControl.modes.favorites,
              icon: StarIcon,
              onSelect: () => dispatch({ type: 'SET_MODE', mode: 'favorites' }),
            },
          ]}
          variant="button"
        >
          {mode === 'current' && homepage.FilterControl.modes.current}
          {mode === 'history' && homepage.FilterControl.modes.history}
          {mode === 'favorites' && homepage.FilterControl.modes.favorites}
        </Menu>
      </div>

      {mode !== 'favorites' && (
        <>
          {notDefault('biddedOnly') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'biddedOnly' })
              }
            >
              <Checkbox checked disabled /> {homepage.FilterControl.biddedOnly}
            </S.Chip>
          )}

          {[...filterState.vocation].map((vocationId) => {
            const vocationName = vocation.getVocationName(vocationId)

            return (
              <S.Chip
                onClose={() =>
                  dispatch({ type: 'TOGGLE_VOCATION', value: vocationId })
                }
              >
                {Icons.Vocations[vocationName]()}
                {vocationName}
              </S.Chip>
            )
          })}

          {[...filterState.pvp].map((type) => {
            const typeName = getInfo.pvp(type)
            return (
              <S.Chip
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
              </S.Chip>
            )
          })}

          {[...filterState.battleye].map((value) => (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'TOGGLE_FILTER_SET', key: 'battleye', value })
              }
            >
              <Icons.Battleye color={value ? 'battleGreen' : 'battleYellow'} />
              {value ? 'Green' : 'Yellow'}
            </S.Chip>
          ))}

          {[...filterState.location].map((type) => {
            const typeName = getInfo.location(type)

            return (
              <S.Chip
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
              </S.Chip>
            )
          })}

          {[...filterState.serverSet].map((server) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'serverSet',
                  value: server,
                })
              }
            >
              {server}
            </S.Chip>
          ))}

          {notDefault('dummy') && (
            <S.Chip
              onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'dummy' })}
            >
              🗿 Training dummy
            </S.Chip>
          )}

          {notDefault('goldPouch') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'goldPouch' })
              }
            >
              💰 Gold pouch
            </S.Chip>
          )}

          {notDefault('hireling') && (
            <S.Chip
              onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'hireling' })}
            >
              💁 Hirelings
            </S.Chip>
          )}

          {notDefault('transferAvailable') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'transferAvailable' })
              }
            >
              🌎 Regular world transfer
            </S.Chip>
          )}

          {notDefault('charmExpansion') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'charmExpansion' })
              }
            >
              🧙‍♂️ Charm Expansion
            </S.Chip>
          )}

          {notDefault('preySlot') && (
            <S.Chip
              onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'preySlot' })}
            >
              🎯 Prey Slot
            </S.Chip>
          )}

          {notDefault('huntingSlot') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'huntingSlot' })
              }
            >
              🏹 Weekly Task Expansion
            </S.Chip>
          )}

          {notDefault('imbuementShrine') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'imbuementShrine' })
              }
            >
              ⛲ Imbuement Shrine
            </S.Chip>
          )}

          {notDefault('rewardShrine') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'rewardShrine' })
              }
            >
              ⛲ Reward Shrine
            </S.Chip>
          )}

          {notDefault('mailbox') && (
            <S.Chip
              onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'mailbox' })}
            >
              📬 Mailbox
            </S.Chip>
          )}

          {(notDefault('minLevel') || notDefault('maxLevel')) && (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'SET_FILTERS',
                  filterOptions: {
                    minLevel: DEFAULT_FILTER_OPTIONS.minLevel,
                    maxLevel: DEFAULT_FILTER_OPTIONS.maxLevel,
                  },
                })
              }
            >
              📏 {notDefault('minLevel') && notDefault('maxLevel') && 'Level'}
              {notDefault('minLevel') && !notDefault('maxLevel') && 'Min level'}
              {!notDefault('minLevel') && notDefault('maxLevel') && 'Max level'}
              :
              <S.Strong>
                {notDefault('minLevel') &&
                  notDefault('maxLevel') &&
                  `${formatNumberWithCommas(
                    filterState.minLevel,
                  )}~${formatNumberWithCommas(filterState.maxLevel)}`}
                {notDefault('minLevel') &&
                  !notDefault('maxLevel') &&
                  formatNumberWithCommas(filterState.minLevel)}
                {!notDefault('minLevel') &&
                  notDefault('maxLevel') &&
                  formatNumberWithCommas(filterState.maxLevel)}
              </S.Strong>
            </S.Chip>
          )}

          {notDefault('minSkill') &&
            [...filterState.skillKey].map((skillKey) => (
              <S.Chip
                onClose={() => {
                  if (filterState.skillKey.size === 1) {
                    dispatch({
                      type: 'SET_FILTERS',
                      filterOptions: {
                        skillKey: DEFAULT_FILTER_OPTIONS.skillKey,
                        minSkill: DEFAULT_FILTER_OPTIONS.minSkill,
                        maxSkill: DEFAULT_FILTER_OPTIONS.maxSkill,
                      },
                    })
                  } else {
                    dispatch({
                      type: 'TOGGLE_FILTER_SET',
                      key: 'skillKey',
                      value: skillKey,
                    })
                  }
                }}
              >
                {Icons.Skill[skillKey as keyof typeof Icons.Skill]()}
                {capitalizeFirstLetter(skillKey)}:{' '}
                <S.Strong>
                  {filterState.minSkill}
                  {notDefault('maxSkill') ? `~${filterState.maxSkill}` : null}
                </S.Strong>
              </S.Chip>
            ))}

          {[...filterState.outfitSet].map((outfit) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'outfitSet',
                  value: outfit,
                })
              }
            >
              👕 {outfit}
            </S.Chip>
          ))}

          {[...filterState.storeOutfitSet].map((outfit) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'storeOutfitSet',
                  value: outfit,
                })
              }
            >
              👕 {outfit}
            </S.Chip>
          ))}

          {[...filterState.mountSet].map((mount) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'mountSet',
                  value: mount,
                })
              }
            >
              🐴 {mount}
            </S.Chip>
          ))}

          {[...filterState.storeMountSet].map((mount) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'storeMountSet',
                  value: mount,
                })
              }
            >
              🐴 {mount}
            </S.Chip>
          ))}

          {notDefault('bossPoints') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'bossPoints' })
              }
            >
              👺 {formatNumberWithCommas(filterState.bossPoints)} Boss points
            </S.Chip>
          )}

          {notDefault('tcInvested') && (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'tcInvested' })
              }
            >
              <Text.TibiaCoin
                className="-mr-0.5"
                value={filterState.tcInvested}
              />{' '}
              {homepage.FilterControl.invested}
            </S.Chip>
          )}

          {imbuementOptions.length === filterState.imbuementsSet.size ? (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'SET_DEFAULT', key: 'imbuementsSet' })
              }
            >
              🪄 {homepage.FilterControl.allImbuements}
            </S.Chip>
          ) : (
            [...filterState.imbuementsSet].map((imbuement) => (
              <S.Chip
                onClose={() =>
                  dispatch({
                    type: 'TOGGLE_FILTER_SET',
                    key: 'imbuementsSet',
                    value: imbuement,
                  })
                }
              >
                🪄 {imbuement}
              </S.Chip>
            ))
          )}

          {[...filterState.greaterGemsSet].map((gem) => (
            <S.Chip
              onClose={() =>
                dispatch({ type: 'TOGGLE_SUPREME_GEM', value: gem })
              }
            >
              💎 {gem}
            </S.Chip>
          ))}

          {[...filterState.questSet].map((quest) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'questSet',
                  value: quest,
                })
              }
            >
              📖 {quest}
            </S.Chip>
          ))}

          {[...filterState.achievementSet].map((achievement) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'achievementSet',
                  value: achievement,
                })
              }
            >
              ⭐ {achievement}
            </S.Chip>
          ))}

          {[...filterState.tags].map((tag) => (
            <S.Chip
              onClose={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: 'tags',
                  value: tag,
                })
              }
            >
              {common.SpecialTags[tag as keyof typeof common.SpecialTags]}
            </S.Chip>
          ))}

          {notDefault('rareNick') && (
            <S.Chip
              onClose={() => dispatch({ type: 'SET_DEFAULT', key: 'rareNick' })}
            >
              {homepage.FilterControl.rareNickname}
            </S.Chip>
          )}
        </>
      )}
    </section>
  )
}

export default FilterControl
