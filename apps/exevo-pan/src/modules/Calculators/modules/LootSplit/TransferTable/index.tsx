import { memo } from 'react'
import clsx from 'clsx'
import { Text } from 'components/Atoms'
import { TransferTableProps } from './types'
import styles from './styles.module.css'

const TransferTable = ({
  transactions,
  className,
  ...props
}: TransferTableProps) => (
  <table className={clsx('border-collapse', className)} {...props}>
    <tbody>
      {transactions.map(({ from, to, amount }) => (
        <tr key={`${from}-${to}`} className="text-tsm">
          <td>{from}</td>
          <td>
            <div className="px-3 py-0.5">
              <Text.GoldCoin value={amount} className="pr-2 font-bold" />
              <div
                className={clsx(
                  'bg-onSurface/25 relative h-[1px] w-full',
                  styles.arrow,
                )}
              />
            </div>
          </td>
          <td>{to}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default memo(TransferTable)
