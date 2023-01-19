import clsx from 'clsx'
import { useMemo } from 'react'
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
} from 'assets/svgs'
import { Menu } from 'components/Organisms'
import { readableCurrentDate } from 'utils'

const PaymentList = () => {
  const list = trpc.listAuctionHighlights.useQuery(undefined, {
    refetchOnWindowFocus: false,
    select: (data) =>
      data.map(({ days, ...rest }) => ({
        ...rest,
        days: days.split(','),
      })),
  })

  const isLoading = list.isFetching
  const currentDate = useMemo(readableCurrentDate, [])

  return (
    <section>
      {isLoading && <LoadingAlert>Loading...</LoadingAlert>}

      <Table>
        <Table.Element className="text-center">
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn highlighted desc>
                Date
              </Table.HeadColumn>
              <Table.HeadColumn>Auction</Table.HeadColumn>
              <Table.HeadColumn>Days</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {(list.data ?? []).map(
              ({
                id,
                confirmed,
                active,
                auctionId,
                nickname,
                lastUpdated,
                days,
              }) => (
                <Table.Row key={id}>
                  <Table.Column>
                    {!active && (
                      <PauseIcon className="fill-primaryAlert mr-1 align-middle" />
                    )}
                    {new Date(lastUpdated).toLocaleString('pt-BR', {
                      hour12: false,
                    })}
                  </Table.Column>
                  <Table.Column>
                    <AuctionLink auctionId={auctionId}>{nickname}</AuctionLink>
                  </Table.Column>
                  <Table.Column>
                    <div className="grid gap-2">
                      {days.map((day) => (
                        <p
                          className={clsx(
                            day === currentDate &&
                              'code text-greenHighlight font-bold',
                          )}
                        >
                          {day}
                        </p>
                      ))}
                    </div>
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
