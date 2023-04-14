import { useState, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Table, Paginator, Checkbox } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { TrashIcon } from 'assets/svgs'
import { officialAuctionUrl } from 'utils'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

type AuctionNotificationProps = {
  list: TRPCRouteOutputs['listMyAuctionNotifications']
  onDelete?: (id: string) => void
}

const PAGE_SIZE = 10

export const List = ({ list, onDelete }: AuctionNotificationProps) => {
  const {
    translations: { dashboard },
  } = useTranslations()

  // const i18n = dashboard.TransactionHistory

  const [index, setIndex] = useState(1)

  const page = useMemo(
    () => list.slice((index - 1) * PAGE_SIZE, index * PAGE_SIZE),
    [index, list],
  )

  const isEmpty = page.length === 0

  return (
    <Table className="mx-auto w-fit">
      <Paginator
        totalItems={list.length}
        currentPage={index}
        pageSize={PAGE_SIZE}
        onChange={setIndex}
        className="ml-auto mb-6 w-fit"
      />

      {!isEmpty ? (
        <Table.Element>
          <Table.Head>
            <Table.Row className="child:pr-2">
              <Table.HeadColumn>Auction</Table.HeadColumn>
              <Table.HeadColumn>Notify on bid</Table.HeadColumn>
              <Table.HeadColumn>Notify at</Table.HeadColumn>
              <Table.HeadColumn className="!pr-0">Remove</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {page.map(
              ({
                id,
                nickname,
                auctionId,
                notifyOnBid,
                notifyAt,
                scheduleCompleted,
                auctionEnd,
              }) => {
                const currentDate = new Date()
                const wasScheduleCompleted = notifyOnBid
                  ? currentDate >= auctionEnd
                  : scheduleCompleted

                return (
                  <Table.Row key={id} className="child:pr-2 text-center">
                    <Table.Column>
                      <a
                        href={officialAuctionUrl(auctionId)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primaryHighlight sm:!text-s !text-xs"
                      >
                        {nickname}
                      </a>
                    </Table.Column>

                    <Table.Column>
                      <div className="mx-auto w-fit">
                        <Checkbox disabled checked={notifyOnBid} />
                      </div>
                    </Table.Column>

                    <Table.Column>
                      {notifyAt && (
                        <span className="sm:text-tsm text-xs">
                          {notifyAt.toLocaleString('pt-BR', {
                            hour12: false,
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </Table.Column>

                    <Table.Column className="!pr-0">
                      {!wasScheduleCompleted && (
                        <button
                          className="clickable mx-auto grid place-items-center rounded-sm p-0.5"
                          type="button"
                          onClick={() => onDelete?.(id)}
                        >
                          <TrashIcon className="fill-red h-4 w-4" />
                        </button>
                      )}
                    </Table.Column>
                  </Table.Row>
                )
              },
            )}
          </Table.Body>
        </Table.Element>
      ) : (
        <EmptyState
          text="No notifications"
          variant="medium"
          className="mt-10 mb-2"
        />
      )}
    </Table>
  )
}
