import clsx from 'clsx'
import { Table, SpritePortrait } from 'components/Atoms'

/* @ ToDo:
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
      <div
        className={clsx(
          'custom-scrollbar -mx-6 grid max-h-[336px] overflow-y-auto px-6 lg:max-h-[600px]',
          iconSrcResolver ? 'gap-3' : 'gap-2',
        )}
      >
        {list.map(({ name, count, percentage }) => {
          const width = `${Math.max(Math.ceil((count / maxCount) * 100), 1)}%`

          return (
            <div
              key={name}
              className={clsx(!!iconSrcResolver && 'flex items-center gap-2.5')}
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
                    className="bg-primary/70 h-3 rounded-sm shadow"
                    title={`${percentage}%`}
                    style={{ width }}
                  />

                  <span>{count}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Table>
  )
}

export default ChartedList
