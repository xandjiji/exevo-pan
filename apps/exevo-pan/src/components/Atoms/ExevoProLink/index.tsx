import clsx from 'clsx'
import { routes } from 'Constants'

const ExevoProLink = ({
  children,
  className,
  ...props
}: Omit<JSX.IntrinsicElements['a'], 'href' | 'ref'>) => (
  <a
    href={routes.EXEVOPRO}
    className={clsx(
      className,
      'rare-gradient-text whitespace-nowrap font-bold',
    )}
    {...props}
  >
    Exevo Pro
    {children ? ' ' : null}
    {children ? <span className="text-onSurface">{children}</span> : null}
  </a>
)

export default ExevoProLink
