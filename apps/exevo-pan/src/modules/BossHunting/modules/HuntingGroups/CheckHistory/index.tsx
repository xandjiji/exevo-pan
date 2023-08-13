import clsx from 'clsx'
import { useEffect, useReducer, useState } from 'react'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Input, Table } from 'components/Atoms'
import { ViewedIcon } from 'assets/svgs'
import EmptyState from 'components/EmptyState'
import { useDebounce } from 'hooks'
import { trpc } from 'lib/trpc'
import { EventTimestamp, ListButton, TableIconWrapper } from '../components'
import { multipleSpawnLocationBosses } from '../../../bossInfo'
import { pageSize, queryReducer } from './reducer'

type CheckHistoryProps = {
  guildId: string
}

const CheckHistory = ({ guildId }: CheckHistoryProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.CheckHistory

  const [{ pageIndex, term, list, exhausted, initiallyFetched }, dispatch] =
    useReducer(queryReducer, {
      guildId,
      pageIndex: 0,
      pageSize,
      term: '',
      list: [],
      initiallyFetched: false,
      exhausted: false,
    })

  const [searchText, setSearchText] = useState(term)
  const debouncedTerm = useDebounce(searchText)

  useEffect(
    () => dispatch({ type: 'QUERY_TERM', term: debouncedTerm }),
    [debouncedTerm],
  )

  const query = trpc.listGuildChecks.useQuery(
    {
      guildId,
      pageIndex,
      pageSize,
      term,
    },
    {
      keepPreviousData: true,
      onSuccess: (data) => dispatch({ type: 'UPDATE_LIST', list: data }),
    },
  )

  const isLoading = query.isFetching

  return (
    <Table>
      <Input
        className="mb-6"
        label={i18n.searchLabel}
        placeholder={i18n.searchPlaceholder}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        stateIcon={isLoading && term && pageIndex === 0 ? 'loading' : 'neutral'}
      />

      {list.length > 0 && (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn />
              <Table.HeadColumn className="text-left">
                {i18n.event}
              </Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {list.map(({ id, checkedAt, boss, location, member }) => (
              <Table.Row
                key={id}
                className={clsx(
                  !!query.data?.find(
                    (lastFetchedItem) => lastFetchedItem.id === id,
                  ) && 'animate-fadeIn',
                )}
              >
                <Table.Column className="w-6 px-3">
                  <TableIconWrapper>
                    <ViewedIcon className="fill-primaryHighlight" />
                  </TableIconWrapper>
                </Table.Column>
                <Table.Column>
                  <div className="grid gap-1 py-0.5">
                    <span className="leading-tight">
                      {templateMessage(i18n.checkEntry, {
                        member: <strong>{member.name}</strong>,
                        boss: (
                          <strong className="text-primaryHighlight">
                            {multipleSpawnLocationBosses.displayName({
                              name: boss,
                              location,
                            })}
                          </strong>
                        ),
                      })}
                    </span>

                    <EventTimestamp date={checkedAt} />
                  </div>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Element>
      )}

      {initiallyFetched && list.length === 0 && (
        <EmptyState text={i18n.emptyState} variant="medium" className="my-4" />
      )}

      {!exhausted && (
        <ListButton
          isLoading={isLoading}
          onClick={() => dispatch({ type: 'NEXT_PAGE' })}
          className="mx-auto"
        >
          {i18n.loadMore}
        </ListButton>
      )}
    </Table>
  )
}

export default CheckHistory
