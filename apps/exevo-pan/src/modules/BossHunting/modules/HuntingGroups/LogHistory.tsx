import clsx from 'clsx'
import { useState } from 'react'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { Table, Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import {
  PersonAddAltIcon,
  PersonRemoveIcon,
  BlogIcon,
  OutlineRemoveIcon,
  ChevronDownIcon,
} from 'assets/svgs'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'
import type { LOG_ENTRY_TYPE } from '@prisma/client'
import { TableIconWrapper, EventTimestamp } from './components'

type LogHistoryProps = {
  guildId: string
}

type LogEntryElement = Record<LOG_ENTRY_TYPE, React.ReactNode>

const pageSize = 10

const LogHistory = ({ guildId }: LogHistoryProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.LogHistory

  const [pageIndex, setPageIndex] = useState(0)
  const [list, setList] = useState<TRPCRouteOutputs['listGuildLog']>([])
  const [{ initiallyFetched, exhausted }, setQueryStatus] = useState({
    initiallyFetched: false,
    exhausted: false,
  })

  const query = trpc.listGuildLog.useQuery(
    {
      guildId,
      pageIndex,
      pageSize,
    },
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        const queryExhausted = data.length === 0 || data.length < pageSize
        setQueryStatus({ initiallyFetched: true, exhausted: queryExhausted })
        setList((prev) => [...prev, ...data])
      },
    },
  )

  const isLoading = query.isFetching

  return (
    <Table>
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
        <Button
          hollow
          pill
          className="mx-auto"
          disabled={isLoading}
          onClick={() => setPageIndex((prev) => prev + 1)}
        >
          {isLoading ? (
            <div
              role="alert"
              className="loading-spinner fill-onPrimary h-6 w-6"
            />
          ) : (
            <>
              <ChevronDownIcon className="h-6 w-6" />
              {i18n.loadMore}
            </>
          )}
        </Button>
      )}
    </Table>
  )
}

export default LogHistory
