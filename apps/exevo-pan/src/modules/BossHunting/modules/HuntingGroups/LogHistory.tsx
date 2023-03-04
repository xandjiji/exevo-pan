import clsx from 'clsx'
import { useState } from 'react'
import { Table, Chip } from 'components/Atoms'
import { Menu } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { MoreHorizontalIcon, CheckIcon, CrossIcon } from 'assets/svgs'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

/* @ ToDo: i18n */

type LogHistoryProps = {
  guildId: string
}

const LogHistory = ({ guildId }: LogHistoryProps) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [list, setList] = useState<TRPCRouteOutputs['listGuildLog']>([])

  const query = trpc.listGuildLog.useQuery(
    {
      guildId,
      pageIndex,
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: (data) => setList((prev) => [...prev, ...data]),
    },
  )

  console.log(list)

  return (
    <Table>
      {list.length > 0 ? (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn />
              <Table.HeadColumn>Event</Table.HeadColumn>
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
                <Table.Row key={id}>
                  <Table.Column>icon</Table.Column>
                  <Table.Column>
                    <div className="grid gap-2">
                      <span>{type}</span>

                      <span className="text-tsm font-light">
                        {new Date(createdAt).toLocaleString('pt-BR', {
                          hour12: false,
                        })}
                      </span>
                    </div>
                  </Table.Column>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table.Element>
      ) : (
        <EmptyState text="No log history" variant="medium" className="my-4" />
      )}
    </Table>
  )
}

export default LogHistory
