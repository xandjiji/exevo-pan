import { Table } from 'components/Atoms'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

type TransactionHistoryProps = {
  list: TRPCRouteOutputs['listMyTransactions']
}

export const List = ({ list }: TransactionHistoryProps) => {
  console.log(list)

  return (
    <Table>
      <Table.Element>
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn>a</Table.HeadColumn>
          </Table.Row>
        </Table.Head>
      </Table.Element>
    </Table>
  )
}
