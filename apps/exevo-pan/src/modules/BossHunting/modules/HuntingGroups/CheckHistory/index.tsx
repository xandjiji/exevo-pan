import clsx from 'clsx'
import { useState } from 'react'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Button, Input, Table } from 'components/Atoms'
import { SearchIcon, ViewedIcon } from 'assets/svgs'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'
import { EventTimestamp, ListButton, TableIconWrapper } from '../components'
import { multipleSpawnLocationBosses } from '../../../bossInfo'

type CheckHistoryProps = {
  guildId: string
}

const pageSize = 10

// @ ToDo:
// enter action
// clear action?
// styling
// i18n

const CheckHistory = ({ guildId }: CheckHistoryProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.CheckHistory

  const [term, setTerm] = useState('')
  const [queryTerm, setQueryTerm] = useState(term)

  const [pageIndex, setPageIndex] = useState(0)
  const [list, setList] = useState<TRPCRouteOutputs['listGuildChecks']>([])
  const [{ initiallyFetched, exhausted }, setQueryStatus] = useState({
    initiallyFetched: false,
    exhausted: false,
  })

  const query = trpc.listGuildChecks.useQuery(
    {
      guildId,
      pageIndex,
      pageSize,
      term: queryTerm,
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
  const isButtonDisabled = isLoading || !term

  const handleSubmit = () => {
    if (isButtonDisabled) return

    setQueryTerm(term)
    setPageIndex(0)
  }

  return (
    <Table>
      <div className="flex items-center gap-4">
        <Input
          className="mb-6 w-full grow"
          label="Search"
          placeholder="Search for bosses or members"
          onChange={(e) => {
            const { value } = e.target
            setTerm(value)
            if (!value) handleSubmit()
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          stateIcon={isLoading && queryTerm ? 'loading' : 'neutral'}
          allowClear
        />
        <Button
          className="h-9 w-10 shrink-0 p-0"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
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
            {list.map(({ id, checkedAt, boss, location, member }) => (
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
                    <ViewedIcon className="fill-primaryHighlight" />
                  </TableIconWrapper>
                </Table.Column>
                <Table.Column>
                  <div className="grid gap-1 py-0.5">
                    <span className="leading-tight">
                      {templateMessage(i18n.checkEntry, {
                        member: <strong>{member.name}</strong>,
                        boss: (
                          <strong className="text-primaryHighlight">
                            {multipleSpawnLocationBosses.displayName({
                              name: boss,
                              location,
                            })}
                          </strong>
                        ),
                      })}
                    </span>

                    <EventTimestamp date={checkedAt} />
                  </div>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Element>
      )}

      {initiallyFetched && list.length === 0 && (
        <EmptyState text={i18n.emptyState} variant="medium" className="my-4" />
      )}

      {!exhausted && (
        <ListButton
          isLoading={isLoading}
          onClick={() => setPageIndex((prev) => prev + 1)}
          className="mx-auto"
        >
          {i18n.loadMore}
        </ListButton>
      )}
    </Table>
  )
}

export default CheckHistory
