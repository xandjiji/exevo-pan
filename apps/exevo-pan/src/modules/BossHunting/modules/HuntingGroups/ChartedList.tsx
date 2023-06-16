import { Table } from 'components/Atoms'

/* @ ToDo:
    - shrink state
    - boss sprite?
    - empty state
    - non member state
    - i18n
*/

type ChartedListProps = {
  heading: string
  subtitle: string
  list: HuntingGroupsStatisticsEntry[]
} & React.ComponentProps<'div'>

const ChartedList = ({ heading, subtitle, list }: ChartedListProps) => {
  const [topEntry] = list
  const maxCount = topEntry ? topEntry.count : 0

  return (
    <Table title={heading} subtitle={subtitle}>
      <Table.Element className="-mt-2">
        <Table.Body>
          {list.map(({ name, count, percentage }) => {
            const width = `${Math.ceil((count / maxCount) * 100)}%`

            return (
              <Table.Row key={name}>
                <div className="py-2">
                  <strong className="text-tsm mb-1 block">{name}</strong>

                  <div className="flex items-center gap-1.5">
                    <div
                      className="bg-primaryVariant border-separator border-1 h-3 rounded-sm border-solid shadow"
                      title={`${percentage}%`}
                      style={{ width }}
                    />

                    <span>{count}</span>
                  </div>
                </div>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Element>
    </Table>
  )
}

export default ChartedList
