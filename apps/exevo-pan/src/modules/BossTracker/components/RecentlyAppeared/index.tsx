import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import { loadBossSrc } from 'utils'
import { hoursAgo } from './utils'
import { RecentlyAppearedProps } from './types'

const OLDER_THRESHOLD = 36

const RecentlyAppeared = ({
  bosses,
  className,
  ...props
}: RecentlyAppearedProps) => (
  <section className={clsx('grid gap-4', className)} {...props}>
    <h3 className="text-2xl font-normal">Recently appeared</h3>

    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2">
      {bosses.map(({ name, lastAppearence }) => {
        const hoursSinceItAppeared = hoursAgo(lastAppearence)
        return (
          <li
            key={name}
            title={`${hoursSinceItAppeared} hours ago`}
            className={clsx(
              'flex items-center gap-2',
              hoursSinceItAppeared >= OLDER_THRESHOLD && 'opacity-40',
            )}
          >
            <SpritePortrait
              src={loadBossSrc(name)}
              alt={name}
              offset
              width={64}
              height={64}
            />

            <p className="text-tsm">{name}</p>
          </li>
        )
      })}
    </ul>
  </section>
)

export default RecentlyAppeared
