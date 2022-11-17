import { Fragment, memo } from 'react'
import clsx from 'clsx'
import { Text, CopyButton } from 'components/Atoms'
import { TransferTableProps } from './types'

const Nickname = (args: JSX.IntrinsicElements['div']) => (
  <div className="overflow-hidden text-ellipsis whitespace-nowrap" {...args} />
)

const TransferTable = ({
  transactions,
  className,
  ...props
}: TransferTableProps) => (
  <div
    className={clsx(
      'text-tsm grid max-w-full grid-cols-[1fr_auto_1fr_24px] gap-y-0.5 gap-x-3 lg:w-full',
      className,
    )}
    {...props}
  >
    {transactions.map(({ from, to, amount }) => (
      <Fragment key={`${from}-${to}`}>
        <Nickname title={from}>{from}</Nickname>
        <Text.Transfer currency="gold" amount={amount} />
        <Nickname title={to}>{to}</Nickname>
        <div>
          <CopyButton copyString={`transfer ${amount} to ${to}`} />
        </div>
      </Fragment>
    ))}
  </div>
)

export default memo(TransferTable)
