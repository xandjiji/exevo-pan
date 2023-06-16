import clsx from 'clsx'
import { Table, SpritePortrait } from 'components/Atoms'

/* @ ToDo:
    - shrink state
    - empty state
    - non member state
    - i18n
*/

type ChartedListProps = {
  heading: string
  subtitle: string
  list: HuntingGroupsStatisticsEntry[]
  iconSrcResolver?: (name: string) => string
} & React.ComponentProps<'div'>

const ChartedList = ({
  heading,
  subtitle,
  list,
  iconSrcResolver,
}: ChartedListProps) => {
  const [topEntry] = list
  const maxCount = topEntry ? topEntry.count : 0

  return (
    <Table title={heading} subtitle={subtitle}>
      <Table.Element className="-mt-2">
        <Table.Body>
          {list.map(({ name, count, percentage }) => {
            const width = `${Math.max(Math.ceil((count / maxCount) * 100), 1)}%`

            return (
              <Table.Row key={name}>
                <div
                  className={clsx(
                    'py-2',
                    !!iconSrcResolver && 'flex items-center gap-2.5',
                  )}
                >
                  {!!iconSrcResolver && (
                    <SpritePortrait
                      alt={name}
                      src={iconSrcResolver(name)}
                      offset
                      width={64}
                      height={64}
                      className="shrink-0"
                    />
                  )}

                  <div className="w-full">
                    <strong
                      className={clsx(
                        'text-tsm block',
                        iconSrcResolver ? 'mb-1 text-base' : 'text-tsm mb-1',
                      )}
                    >
                      {name}
                    </strong>

                    <div className={clsx('flex items-center gap-1.5')}>
                      <div
                        className="bg-separator h-3 rounded-sm shadow"
                        title={`${percentage}%`}
                        style={{ width }}
                      />

                      <span>{count}</span>
                    </div>
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
