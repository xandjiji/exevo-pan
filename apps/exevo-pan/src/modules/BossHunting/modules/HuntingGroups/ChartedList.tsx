import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Table, SpritePortrait } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { LockIcon } from 'assets/svgs'

type ChartedListProps = {
  heading: string
  subtitle: string
  list: HuntingGroupsStatisticsEntry[]
  iconSrcResolver?: (name: string) => string
  emptyMessage: string
  mock?: boolean
} & React.ComponentProps<'div'>

const ChartedList = ({
  heading,
  subtitle,
  list,
  iconSrcResolver,
  emptyMessage,
  mock = false,
}: ChartedListProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.GroupStatistics

  const [topEntry] = list
  const isEmpty = useMemo(
    () => list.filter(({ count }) => count > 0).length === 0,
    [list],
  )
  const maxCount = topEntry ? topEntry.count : 0

  return (
    <Table title={heading} subtitle={subtitle}>
      {isEmpty ? (
        <EmptyState text={emptyMessage} variant="medium" className="mt-2" />
      ) : (
        <div
          className={clsx(
            'custom-scrollbar -my-4 -mx-6 grid max-h-[336px] overflow-y-auto py-4 px-6 lg:max-h-[600px]',
            iconSrcResolver ? 'gap-3' : 'gap-2',
            mock && 'relative',
          )}
        >
          {mock && (
            <div className="absolute-centered bg-surface/70 z-1 flex h-full w-full flex-col items-center justify-center gap-2">
              <LockIcon className="fill-separator h-28 w-28" />
              <strong className="text-onSurface text-center text-2xl">
                {i18n.membersOnly}
              </strong>
            </div>
          )}
          {list.map(({ name, count, percentage }) => {
            const width = `${Math.max(Math.ceil((count / maxCount) * 100), 1)}%`

            return (
              <div
                key={name}
                className={clsx(
                  !!iconSrcResolver && 'flex items-center gap-2.5',
                  mock && 'opacity-70',
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
                      mock && 'opacity-60',
                    )}
                  >
                    {name}
                  </strong>

                  <div className={clsx('flex items-center gap-1.5')}>
                    <div
                      className="bg-primary/70 h-1.5 rounded-sm shadow"
                      title={mock ? undefined : `${percentage}%`}
                      style={{ width }}
                    />

                    {!mock && <span>{count}</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Table>
  )
}

export default ChartedList
