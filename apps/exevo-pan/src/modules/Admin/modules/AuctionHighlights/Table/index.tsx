import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { trpc } from 'lib/trpc'
import {
  LoadingAlert,
  Table,
  AuctionLink,
  Dialog,
  Button,
} from 'components/Atoms'
import {
  MoreHorizontalIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  CalendarDaysIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
  HourglassIcon,
  ViewedIcon,
  NewIcon,
} from 'assets/svgs'
import { Menu, Tooltip } from 'components/Organisms'
import { readableCurrentDate } from 'utils'
import { getHighlightStatus, isPastDate } from './utils'
import { HighlightStatus } from './types'

const PaymentList = () => {
  const currentDate = useMemo(readableCurrentDate, [])

  const list = trpc.listAuctionHighlights.useQuery(undefined, {
    refetchOnWindowFocus: false,
    select: (data) =>
      data.map(({ days, active, ...rest }) => {
        const splittedDays = days.split(',')

        return {
          ...rest,
          active,
          days: splittedDays,
          status: getHighlightStatus(active, splittedDays),
        }
      }),
  })

  const isLoading = list.isFetching

  const [filterStatus, setFilterStatus] = useState<'NONE' | HighlightStatus>(
    'NONE',
  )

  const renderedList = useMemo(
    () =>
      list.data
        ? filterStatus === 'NONE'
          ? list.data
          : list.data.filter(({ status }) => status === filterStatus)
        : [],
    [list, filterStatus],
  )

  return (
    <section>
      {isLoading && <LoadingAlert>Loading...</LoadingAlert>}

      <Table>
        <Table.Element className="text-center">
          <Table.Head>
            <Table.Row className="child:align-bottom">
              <Table.HeadColumn>
                <Menu
                  offset={[0, 8]}
                  placement="bottom-start"
                  items={[
                    {
                      label: 'None',
                      onSelect: () => setFilterStatus('NONE'),
                    },
                    {
                      label: 'Paused',
                      onSelect: () => setFilterStatus('PAUSED'),
                      icon: PauseIcon,
                    },
                    {
                      label: 'Running',
                      onSelect: () => setFilterStatus('RUNNING'),
                      icon: NewIcon,
                    },
                    {
                      label: 'Waiting',
                      onSelect: () => setFilterStatus('WAITING'),
                      icon: HourglassIcon,
                    },
                    {
                      label: 'Finished',
                      onSelect: () => setFilterStatus('FINISHED'),
                      icon: ViewedIcon,
                    },
                  ]}
                  variant="button"
                >
                  {
                    {
                      NONE: 'Filter status',
                      PAUSED: 'Paused',
                      RUNNING: 'Running',
                      WAITING: 'Waiting',
                      FINISHED: 'Finished',
                    }[filterStatus]
                  }
                </Menu>
              </Table.HeadColumn>
              <Table.HeadColumn highlighted desc>
                Date
              </Table.HeadColumn>
              <Table.HeadColumn>Auction</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {renderedList.map(
              ({
                id,
                status,
                confirmed,
                active,
                auctionId,
                nickname,
                lastUpdated,
                days,
              }) => (
                <Table.Row key={id}>
                  <Table.Column>
                    <Tooltip
                      offset={[0, 8]}
                      content={
                        <div className="grid gap-2">
                          {days.map((day) => (
                            <p
                              className={clsx(
                                isPastDate(day) &&
                                  'text-separator line-through',
                                day === currentDate &&
                                  'text-greenHighlight font-bold',
                              )}
                            >
                              {day}
                            </p>
                          ))}
                        </div>
                      }
                    >
                      <p className="code child:shrink-0 child:w-4 child:h-4 flex cursor-pointer items-center gap-1.5">
                        {
                          {
                            PAUSED: (
                              <>
                                <PauseIcon className="fill-red" />
                                Paused
                              </>
                            ),
                            RUNNING: (
                              <>
                                <NewIcon className="fill-greenHighlight" />
                                Running
                              </>
                            ),
                            WAITING: (
                              <>
                                <HourglassIcon className="fill-primaryAlert" />
                                Waiting
                              </>
                            ),
                            FINISHED: (
                              <>
                                <ViewedIcon className="fill-separator" />
                                Finished
                              </>
                            ),
                          }[status]
                        }
                      </p>
                    </Tooltip>
                  </Table.Column>
                  <Table.Column>
                    {new Date(lastUpdated).toLocaleString('pt-BR', {
                      hour12: false,
                    })}
                  </Table.Column>
                  <Table.Column>
                    <AuctionLink auctionId={auctionId}>{nickname}</AuctionLink>
                  </Table.Column>
                  <Table.Column>
                    <Menu
                      offset={[0, 8]}
                      items={[
                        {
                          label: confirmed ? 'Unconfirm' : 'Confirm',
                          icon: confirmed ? ThumbsDownIcon : ThumbsUpIcon,
                          disabled: confirmed,
                        },
                        {
                          label: 'Pause',
                          icon: active ? PauseIcon : PlayIcon,
                        },
                        {
                          label: 'Update dates',
                          icon: CalendarDaysIcon,
                        },
                        {
                          label: 'Delete',
                          icon: TrashIcon,
                        },
                      ]}
                    >
                      <MoreHorizontalIcon className="fill-onSurface" />
                    </Menu>
                  </Table.Column>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table.Element>
      </Table>

      {/* <Dialog
        isOpen={!!toConfirm.character}
        onClose={resetConfirmation}
        heading="Do you really want to proceed?"
        noCloseButton
        className="grid max-w-[90vw] text-base"
      >
        <p className="mt-4 mb-6 flex flex-wrap items-center gap-2">
          <span
            className={`code ${
              toConfirm.confirmed ? 'text-greenHighlight' : 'text-red'
            }`}
          >
            {toConfirm.confirmed ? 'Confirm' : 'Unconfirm'}
          </span>
          <p className="code w-fit">{toConfirm.character}</p>
        </p>

        <div className="flex justify-end gap-1">
          <Button hollow pill onClick={resetConfirmation}>
            Cancel
          </Button>
          <Button pill onClick={() => updateProOrders.mutate(toConfirm)}>
            Confirm
          </Button>
        </div>
      </Dialog> */}
    </section>
  )
}

export default PaymentList
