import { memo } from 'react'
import clsx from 'clsx'
import { Text, CopyButton } from 'components/Atoms'
import { TransferTableProps } from './types'
import styles from './styles.module.css'

const Nickname = (args: JSX.IntrinsicElements['td']) => (
  <td
    className="max-w-[15vw] overflow-hidden text-ellipsis whitespace-nowrap lg:w-[96px] lg:max-w-[96px]"
    {...args}
  />
)

const TransferTable = ({
  transactions,
  className,
  ...props
}: TransferTableProps) => (
  <table className={clsx('border-collapse lg:max-w-fit', className)} {...props}>
    <tbody>
      {transactions.map(({ from, to, amount }) => (
        <tr key={`${from}-${to}`} className="text-tsm">
          <Nickname>{from}</Nickname>
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
          <Nickname>{to}</Nickname>
          <td>
            <CopyButton
              className="ml-3"
              copyString={`transfer ${amount} to ${to}`}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default memo(TransferTable)
