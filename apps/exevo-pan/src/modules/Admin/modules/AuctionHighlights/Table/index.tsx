import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { trpc } from 'lib/trpc'
import { LoadingAlert, Table, Dialog, Button, Alert } from 'components/Atoms'
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
import { Menu, Tooltip, FutureRangeDatePicker } from 'components/Organisms'
import { readableCurrentDate, ddmmyyy2mmddyyyy } from 'utils'
import AuctionSummary from './AuctionSummary'
import { useRangeDatePicker } from './useRangeDatePicker'
import {
  getHighlightStatus,
  isPastDate,
  SEPARATOR,
  toggleJoinedDateString,
  forwardOneMonth,
} from './utils'
import { HighlightStatus } from './types'

const EMPTY_DELETION = { id: '', auctionId: 0, nickname: '', lastUpdated: '' }
const EMPTY_TOGGLE_DATE = { ...EMPTY_DELETION, joinedReadableDate: '' }

const PaymentList = () => {
  const [filterStatus, setFilterStatus] = useState<'NONE' | HighlightStatus>(
    'NONE',
  )

  const [alertMessage, setAlertMessage] = useState({
    nickname: '',
    message: '',
  })
  const [toDelete, setToDelete] = useState(EMPTY_DELETION)
  const { toToggleDate, setToToggleDate, resetDates, ...rageDatePickerProps } =
    useRangeDatePicker()

  const currentDate = useMemo(readableCurrentDate, [])

  const list = trpc.listAuctionHighlights.useQuery(undefined, {
    refetchOnWindowFocus: false,
    select: (data) =>
      data.map(({ days, active, ...rest }) => {
        const splittedDays = days.split(',')

        return {
          ...rest,
          active,
          joinedReadableDate: days,
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
      setAlertMessage({ nickname, message: 'was updated' })
      list.refetch()
    },
  })

  const remove = trpc.deleteAuctionHighlight.useMutation({
    onSuccess: ({ nickname }) => {
      setAlertMessage({ nickname, message: 'was deleted' })
      setToDelete(EMPTY_DELETION)
      list.refetch()
    },
  })

  const isLoading = list.isFetching || patch.isLoading || remove.isLoading

  return (
    <section className="grid gap-2">
      {isLoading && <LoadingAlert>Loading...</LoadingAlert>}

      {!!alertMessage.message && (
        <Alert variant="primary">
          <strong className="text-primaryHighlight">
            {alertMessage.nickname}
          </strong>{' '}
          {alertMessage.message}
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
                      label: 'Scheduled',
                      onSelect: () => setFilterStatus('SCHEDULED'),
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
                        SCHEDULED: 'Scheduled',
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
                joinedReadableDate,
              }) => (
                <Table.Row
                  key={id}
                  className={clsx(
                    toDelete.id === id && 'bg-red/20',
                    'hover:bg-background group',
                  )}
                >
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
                      <p className="code group-hover:bg-separator/50 child:shrink-0 child:w-4 child:h-4 flex cursor-pointer items-center gap-1.5">
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
                            SCHEDULED: (
                              <>
                                <HourglassIcon className="fill-primaryAlert" />
                                Scheduled
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
                    <AuctionSummary
                      auctionId={auctionId}
                      nickname={nickname}
                      lastUpdated={lastUpdated}
                    />
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
                          onSelect: () =>
                            setToToggleDate({
                              id,
                              auctionId,
                              nickname,
                              lastUpdated,
                              joinedReadableDate,
                            }),
                        },
                        {
                          label: 'Delete',
                          icon: TrashIcon,
                          onSelect: () =>
                            setToDelete({
                              id,
                              auctionId,
                              nickname,
                              lastUpdated,
                            }),
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

      <Dialog
        isOpen={!!toToggleDate.id}
        onClose={resetDates}
        heading="Update highlighted dates:"
        className="xs:w-[420px] grid gap-6"
        noCloseButton
      >
        <AuctionSummary {...toToggleDate} className="code -mt-4" />

        <FutureRangeDatePicker {...rageDatePickerProps} />

        <div className="flex justify-end gap-1">
          <Button hollow pill onClick={resetDates} disabled={remove.isLoading}>
            Cancel
          </Button>
          <Button
            pill
            /* onClick={() => remove.mutate(toDelete.id)} */
            loading={remove.isLoading}
            disabled={remove.isLoading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={!!toDelete.id}
        onClose={() => setToDelete(EMPTY_DELETION)}
        heading="Do you really want to delete this highlight?"
        className="grid max-w-xs"
        noCloseButton
      >
        <AuctionSummary {...toDelete} className="code mt-2 mb-6" />

        <div className="flex justify-end gap-1">
          <Button
            hollow
            pill
            onClick={() => setToDelete(EMPTY_DELETION)}
            disabled={remove.isLoading}
          >
            Cancel
          </Button>
          <Button
            pill
            onClick={() => remove.mutate(toDelete.id)}
            loading={remove.isLoading}
            disabled={remove.isLoading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </section>
  )
}

export default PaymentList
