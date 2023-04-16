import { useState, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Table, Paginator } from 'components/Atoms'
import { TrashIcon } from 'assets/svgs'
import EmptyState from 'components/EmptyState'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

type TransactionHistoryProps = {
  list: TRPCRouteOutputs['listMyDevices']
  onDelete?: (id: string) => void
}

const PAGE_SIZE = 10

export const List = ({ list, onDelete }: TransactionHistoryProps) => {
  const {
    translations: { dashboard },
  } = useTranslations()

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
              <Table.HeadColumn>Device</Table.HeadColumn>
              <Table.HeadColumn className="px-8">Date</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {page.map(({ auth, lastUpdated, metadata }) => (
              <Table.Row key={auth} className="text-center">
                <Table.Column className="w-fit py-2">
                  {metadata ? (
                    <span
                      className="code max-w-[120px] truncate"
                      title={metadata}
                    >
                      {metadata}
                    </span>
                  ) : (
                    '--'
                  )}
                </Table.Column>

                <Table.Column className="!text-tsm px-3 sm:px-8">
                  {lastUpdated.toLocaleString('pt-BR', { hour12: false })}
                </Table.Column>

                <Table.Column>
                  <button
                    className="clickable mx-auto grid place-items-center rounded-sm p-0.5"
                    type="button"
                    title={i18n.deleteLabel}
                    aria-label={i18n.deleteLabel}
                    onClick={() => onDelete?.(auth)}
                  >
                    <TrashIcon className="fill-red h-4 w-4" />
                  </button>
                </Table.Column>
              </Table.Row>
            ))}
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
