import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import { loadBossSrc } from 'utils'
import { RecentlyAppearedProps } from './types'

const RecentlyAppeared = ({
  bosses,
  className,
  ...props
}: RecentlyAppearedProps) => {
  console.log(bosses)

  return (
    <section className={clsx('grid gap-4', className)} {...props}>
      <h3 className="text-2xl font-normal">Recently appeared</h3>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2">
        {bosses.map(({ name }) => (
          <li key={name} className="flex items-center gap-2">
            <SpritePortrait
              src={loadBossSrc(name)}
              alt={name}
              offset
              width={64}
              height={64}
            />

            <p className="text-tsm">{name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentlyAppeared
