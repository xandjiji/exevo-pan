import clsx from 'clsx'
import { useState, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Table, Chip, CopyButton, Text, Paginator } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { officialAuctionUrl, officialCharacterUrl } from 'utils'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

type TransactionHistoryProps = {
  list: TRPCRouteOutputs['listMyTransactions']
}

const PAGE_SIZE = 10

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

export const List = ({ list }: TransactionHistoryProps) => {
  const { dashboard } = useTranslations()

  const i18n = dashboard.TransactionHistory

  const [index, setIndex] = useState(1)

  const page = useMemo(
    () => list.slice((index - 1) * PAGE_SIZE, index * PAGE_SIZE),
    [index, list],
  )

  const isEmpty = page.length === 0

  return (
    <Table className="mx-auto w-fit" title={i18n.title}>
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
            <Table.Row>
              <Table.HeadColumn>ID</Table.HeadColumn>
              <Table.HeadColumn className="px-8">
                {i18n.description}
              </Table.HeadColumn>
              <Table.HeadColumn>{i18n.price}</Table.HeadColumn>
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
                  <Table.Column className="w-fit py-2">
                    <span className="code flex w-min flex-col items-center gap-2 px-2 text-center text-xs sm:flex-row sm:px-3 sm:text-justify">
                      <span
                        className="after:whitespace-nowrap after:text-[8px] after:tracking-tighter after:content-['...'] sm:whitespace-nowrap"
                        style={{ wordBreak: 'break-word' }}
                      >
                        {id.slice(0, 6)}
                      </span>
                      <CopyButton
                        variant="small"
                        copyString={id}
                        className="bg-primary child:fill-onPrimary shrink-0 p-1"
                      />{' '}
                    </span>
                  </Table.Column>

                  <Table.Column className="px-3 sm:px-8">
                    <Tooltip
                      content={
                        <div className="grid gap-3 text-left">
                          {exevoProPayment && (
                            <>
                              <Summary heading={i18n.paymentCharacter}>
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

                              <Summary heading={i18n.status}>
                                <span
                                  className={clsx(
                                    exevoProPayment.confirmed &&
                                      'text-greenHighlight',
                                  )}
                                >
                                  {exevoProPayment.confirmed
                                    ? i18n.confirmed
                                    : i18n.processing}
                                </span>
                              </Summary>
                            </>
                          )}

                          {highlightedAuction && (
                            <>
                              <Summary heading={i18n.auction}>
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

                              <Summary heading={i18n.highlightedDays}>
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
                          {type === 'AUCTION_HIGHLIGHT' &&
                            i18n.auctionHighlight}
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
        <EmptyState
          text={i18n.emptyState}
          variant="medium"
          className="mt-10 mb-2"
        />
      )}
    </Table>
  )
}
