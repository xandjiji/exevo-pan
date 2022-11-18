import { memo } from 'react'
import clsx from 'clsx'
import { CheckIcon } from 'assets/svgs'

const Heading = ({ className, ...props }: JSX.IntrinsicElements['p']) => (
  <p
    className={clsx(
      className,
      'flex flex-wrap items-center justify-center gap-2',
    )}
    {...props}
  />
)

const Li = ({ className, children, ...props }: JSX.IntrinsicElements['li']) => (
  <li className={clsx('flex items-center gap-1', className)} {...props}>
    <CheckIcon className="fill-greenHighlight shrink-0" />
    {children}
  </li>
)

const Pitch = () => (
  <div className="grid place-items-center gap-8">
    <div className="grid place-items-center gap-2">
      <Heading>
        Upgrade now to{' '}
        <strong className="text-primaryHighlight text-2xl tracking-wider">
          Exevo Pro 🧙‍♂️
        </strong>
      </Heading>
      <p>And have access to exclusive features!</p>
    </div>

    <div className="text-tsm grid gap-4">
      <ul className="grid gap-2">
        <Li>Find out how much TC was invested in any Bazaar character</Li>
        <Li>
          {' '}
          Exclusive <strong>auction filters</strong>
        </Li>
        <Li>
          Access to all bosses from <strong>Boss Tracker</strong>
        </Li>
      </ul>
      <p className="text-right">...and more in the future!</p>
    </div>

    <Heading>
      Pay once, yours <strong className="text-2xl">forever 🙌</strong>
    </Heading>
  </div>
)

export default memo(Pitch)
