import { Fragment, memo } from 'react'
import clsx from 'clsx'
import { Text, CopyButton } from 'components/Atoms'
import { TransferTableProps } from './types'
import styles from './styles.module.css'

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
        <div>
          <Text.GoldCoin value={amount} className="pr-3 font-bold" />
          <div
            className={clsx(
              'bg-onSurface/25 relative h-[1px] w-full',
              styles.arrow,
            )}
          />
        </div>
        <Nickname title={to}>{to}</Nickname>
        <div>
          <CopyButton copyString={`transfer ${amount} to ${to}`} />
        </div>
      </Fragment>
    ))}
  </div>
)

export default memo(TransferTable)
