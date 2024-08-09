import clsx from 'clsx'
import Link from 'next/link'
import { routes } from 'Constants'

const ExevoProLink = ({
  children,
  className,
  ...props
}: Omit<JSX.IntrinsicElements['a'], 'href' | 'ref'>) => (
  <Link
    href={routes.EXEVOPRO}
    className={clsx(
      className,
      'rare-gradient-text whitespace-nowrap font-bold',
    )}
    prefetch={false}
    {...props}
  >
    Exevo Pro
    {children ? ' ' : null}
    {children ? <span className="text-onSurface">{children}</span> : null}
  </Link>
)

export default ExevoProLink
