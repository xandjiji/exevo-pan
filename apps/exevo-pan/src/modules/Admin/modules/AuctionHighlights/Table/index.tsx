import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { trpc } from 'lib/trpc'
import {
  LoadingAlert,
  Table,
  AuctionLink,
  Dialog,
  Button,
  Alert,
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
  ChevronDownIcon,
} from 'assets/svgs'
import { Menu, Tooltip } from 'components/Organisms'
import { readableCurrentDate } from 'utils'
import { getHighlightStatus, isPastDate } from './utils'
import { HighlightStatus } from './types'

const PaymentList = () => {
  const [filterStatus, setFilterStatus] = useState<'NONE' | HighlightStatus>(
    'NONE',
  )

  const [updatedCharacter, setUpdatedCharacter] = useState('')

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

  const renderedList = useMemo(
    () =>
      list.data
        ? filterStatus === 'NONE'
          ? list.data
          : list.data.filter(({ status }) => status === filterStatus)
        : [],
    [list, filterStatus],
  )

  const patch = trpc.patchAuctionHighlights.useMutation({
    onSuccess: ({ nickname }) => {
      setUpdatedCharacter(nickname)
      list.refetch()
    },
  })

  const isLoading = list.isFetching || patch.isLoading

  return (
    <section className="grid gap-2">
      {isLoading && <LoadingAlert>Loading...</LoadingAlert>}

      {!!updatedCharacter && (
        <Alert variant="primary">
          <strong className="text-primaryHighlight">{updatedCharacter}</strong>{' '}
          was updated
        </Alert>
      )}

      <Table>
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>
                <Menu
                  offset={[0, 0]}
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
                >
                  <div className="text-onSurface flex items-center gap-1.5 p-1 px-2">
                    {
                      {
                        NONE: 'Filter status',
                        PAUSED: 'Paused',
                        RUNNING: 'Running',
                        WAITING: 'Waiting',
                        FINISHED: 'Finished',
                      }[filterStatus]
                    }
                    <ChevronDownIcon className="fill-onSurface h-4 w-4" />
                  </div>
                </Menu>
              </Table.HeadColumn>
              <Table.HeadColumn highlighted desc className="text-left">
                Order
              </Table.HeadColumn>
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
                  <Table.Column className="text-center">
                    <Tooltip
                      offset={[0, 8]}
                      placement="right"
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
                                <ViewedIcon className="fill-primary" />
                                Finished
                              </>
                            ),
                          }[status]
                        }
                      </p>
                    </Tooltip>
                  </Table.Column>
                  <Table.Column>
                    <div className="grid gap-1.5">
                      <AuctionLink auctionId={auctionId}>
                        {nickname}
                      </AuctionLink>
                      <p>
                        {new Date(lastUpdated).toLocaleString('pt-BR', {
                          hour12: false,
                        })}
                      </p>
                    </div>
                  </Table.Column>
                  <Table.Column>
                    <Menu
                      offset={[0, 8]}
                      items={[
                        {
                          label: confirmed ? 'Unconfirm' : 'Confirm',
                          icon: confirmed ? ThumbsDownIcon : ThumbsUpIcon,
                          onSelect: () =>
                            patch.mutate({ id, confirmed: !confirmed }),
                        },
                        {
                          label: active ? 'Pause' : 'Resume',
                          icon: active ? PauseIcon : PlayIcon,
                          onSelect: () => patch.mutate({ id, active: !active }),
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
