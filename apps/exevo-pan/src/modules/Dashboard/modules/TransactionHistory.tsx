import clsx from 'clsx'
import { useState, useMemo } from 'react'
import { Table, Chip, CopyButton, Text, Paginator } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { officialAuctionUrl, officialCharacterUrl } from 'utils'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

type TransactionHistoryProps = {
  list: TRPCRouteOutputs['listMyTransactions']
}

/* @ ToDo:

- mobile
- i18n

*/

const formatCurrency = ({
  value,
  currency,
}: {
  value: number
  currency: string
}) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency,
  }).format(value)

const Summary = ({
  heading,
  children,
  className,
  ...props
}: { heading: string } & JSX.IntrinsicElements['div']) => (
  <div className={clsx(className, '')} {...props}>
    <p className="text-xs font-light">{heading}</p>
    <p className="text-base font-bold">{children}</p>
  </div>
)

const PAGE_SIZE = 10

export const List = ({ list }: TransactionHistoryProps) => {
  const [index, setIndex] = useState(1)

  const page = useMemo(
    () => list.slice((index - 1) * PAGE_SIZE, index * PAGE_SIZE),
    [index, list],
  )

  return (
    <Table className="mx-auto w-fit" title="Transaction History">
      <Paginator
        totalItems={list.length}
        currentPage={index}
        pageSize={PAGE_SIZE}
        onChange={setIndex}
        className="ml-auto mb-6 w-fit"
      />

      {list.length > 0 ? (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>ID</Table.HeadColumn>
              <Table.HeadColumn className="px-8">Description</Table.HeadColumn>
              <Table.HeadColumn>Price</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {page.map(
              ({
                id,
                date,
                type,
                value,
                currency,
                exevoProPayment,
                highlightedAuction,
              }) => (
                <Table.Row key={id} className="text-center">
                  <Table.Column className="grid w-fit gap-2 py-2">
                    <span className="code flex w-min items-center gap-2 text-justify text-xs">
                      <span className="after:text-[8px] after:tracking-tighter after:content-['...']">
                        {id.slice(0, 6)}
                      </span>
                      <CopyButton
                        variant="small"
                        copyString={id}
                        className="bg-primary child:fill-onPrimary shrink-0 p-1"
                      />{' '}
                    </span>
                  </Table.Column>

                  <Table.Column className="px-8">
                    <Tooltip
                      content={
                        <div className="grid gap-3 text-left">
                          {exevoProPayment && (
                            <>
                              <Summary heading="Payment character">
                                <a
                                  href={officialCharacterUrl(
                                    exevoProPayment.character,
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-primaryHighlight"
                                >
                                  {exevoProPayment.character}
                                </a>
                              </Summary>

                              <Summary heading="Status">
                                <span
                                  className={clsx(
                                    exevoProPayment.confirmed &&
                                      'text-greenHighlight',
                                  )}
                                >
                                  {exevoProPayment.confirmed
                                    ? 'Confirmed'
                                    : 'Processing'}
                                </span>
                              </Summary>
                            </>
                          )}

                          {highlightedAuction && (
                            <>
                              <Summary heading="Auction">
                                <a
                                  href={officialAuctionUrl(
                                    highlightedAuction.auctionId,
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-primaryHighlight"
                                >
                                  {highlightedAuction.nickname}
                                </a>
                              </Summary>

                              <Summary heading="Highlighted days">
                                <ul className="grid gap-1 pt-1">
                                  {highlightedAuction.days
                                    .split(',')
                                    .map((day) => (
                                      <li key={day} className="text-tsm">
                                        {day}
                                      </li>
                                    ))}
                                </ul>
                              </Summary>
                            </>
                          )}
                        </div>
                      }
                    >
                      <>
                        <p
                          className={clsx(
                            type === 'EXEVO_PRO' &&
                              'rare-gradient-text font-bold',
                          )}
                        >
                          {type === 'AUCTION_HIGHLIGHT' && 'Auction Highlight'}
                          {type === 'EXEVO_PRO' && 'Exevo Pro'}
                        </p>

                        <p className="mt-1 text-xs font-light">
                          {date.toLocaleString('pt-BR', { hour12: false })}
                        </p>
                      </>
                    </Tooltip>
                  </Table.Column>

                  <Table.Column>
                    <Chip gray className="justify-center">
                      {currency === 'TIBIA_COINS' ? (
                        <Text.TibiaCoin value={value} />
                      ) : (
                        <>{formatCurrency({ value, currency })}</>
                      )}
                    </Chip>
                  </Table.Column>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table.Element>
      ) : (
        <EmptyState text="No transactions" variant="medium" className="mb-2" />
      )}
    </Table>
  )
}
