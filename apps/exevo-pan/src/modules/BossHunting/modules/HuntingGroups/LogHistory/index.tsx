import clsx from 'clsx'
import { useEffect, useReducer, useState } from 'react'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Checkbox, Input, Table } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { useDebounce } from 'hooks'
import { trpc } from 'lib/trpc'
import {
  BlogIcon,
  OutlineRemoveIcon,
  PersonAddAltIcon,
  PersonRemoveIcon,
} from 'assets/svgs'
import type { LOG_ENTRY_TYPE } from 'db/prisma/generated/client'
import { pageSize, queryReducer } from './reducer'
import { EventTimestamp, ListButton, TableIconWrapper } from '../components'

type LogHistoryProps = {
  guildId: string
}

type LogEntryElement = Record<LOG_ENTRY_TYPE, React.ReactNode>

const LogHistory = ({ guildId }: LogHistoryProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.LogHistory

  const [
    { pageIndex, term, showNoChance, list, exhausted, initiallyFetched },
    dispatch,
  ] = useReducer(queryReducer, {
    guildId,
    pageIndex: 0,
    pageSize,
    term: '',
    showNoChance: false,
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

  const query = trpc.listGuildLog.useQuery(
    {
      guildId,
      pageIndex,
      pageSize,
      term,
      showNoChance,
    },
    {
      keepPreviousData: true,
      onSuccess: (data) => dispatch({ type: 'UPDATE_LIST', list: data }),
    },
  )

  const isLoading = query.isFetching

  return (
    <Table>
      <div className="mb-6 flex flex-col gap-4">
        <Input
          label={i18n.searchLabel}
          placeholder={i18n.searchPlaceholder}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          stateIcon={
            isLoading && term && pageIndex === 0 ? 'loading' : 'neutral'
          }
        />

        <Checkbox
          label={i18n.noChanceLabel}
          checked={showNoChance}
          onClick={() => dispatch({ type: 'TOGGLE_NO_CHANCE' })}
        />
      </div>

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
            {list.map(
              ({
                id,
                createdAt,
                type,
                actionGuildMember,
                targetGuildMember,
                metadata,
              }) => (
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
                      {
                        (
                          {
                            LEAVE_MEMBER: (
                              <PersonRemoveIcon className="fill-red" />
                            ),
                            REJECT_MEMBER: (
                              <OutlineRemoveIcon className="fill-red" />
                            ),
                            KICK_MEMBER: (
                              <PersonRemoveIcon className="fill-red" />
                            ),
                            ACCEPT_MEMBER: (
                              <PersonAddAltIcon className="fill-greenHighlight" />
                            ),
                            NOTIFICATION: (
                              <BlogIcon className="fill-primaryHighlight" />
                            ),
                            SET_AS_NO_CHANCE: (
                              <OutlineRemoveIcon className="fill-red" />
                            ),
                          } as LogEntryElement
                        )[type]
                      }
                    </TableIconWrapper>
                  </Table.Column>
                  <Table.Column>
                    <div className="grid gap-1 py-0.5">
                      <span className="leading-tight">
                        {
                          (
                            {
                              LEAVE_MEMBER: templateMessage(i18n.leave, {
                                name: <strong>{metadata}</strong>,
                              }),
                              REJECT_MEMBER: templateMessage(i18n.reject, {
                                actor: (
                                  <strong>{actionGuildMember?.name}</strong>
                                ),
                                target: <strong>{metadata}</strong>,
                              }),
                              KICK_MEMBER: templateMessage(i18n.kick, {
                                actor: (
                                  <strong>{actionGuildMember?.name}</strong>
                                ),
                                target: <strong>{metadata}</strong>,
                              }),
                              ACCEPT_MEMBER: templateMessage(i18n.accept, {
                                actor: (
                                  <strong>{actionGuildMember?.name}</strong>
                                ),
                                target: (
                                  <strong>{targetGuildMember?.name}</strong>
                                ),
                              }),
                              NOTIFICATION: templateMessage(i18n.notification, {
                                actor: (
                                  <strong>{actionGuildMember?.name}</strong>
                                ),
                                boss: (
                                  <strong className="text-primaryHighlight">
                                    {metadata}
                                  </strong>
                                ),
                              }),
                              SET_AS_NO_CHANCE: templateMessage(
                                i18n.setAsNoChance,
                                {
                                  actor: (
                                    <strong>{actionGuildMember?.name}</strong>
                                  ),
                                  boss: (
                                    <strong className="text-primaryHighlight">
                                      {metadata}
                                    </strong>
                                  ),
                                },
                              ),
                            } as LogEntryElement
                          )[type]
                        }
                      </span>

                      <EventTimestamp date={createdAt} />
                    </div>
                  </Table.Column>
                </Table.Row>
              ),
            )}
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

export default LogHistory
