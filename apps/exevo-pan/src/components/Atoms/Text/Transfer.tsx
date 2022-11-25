import { memo } from 'react'
import clsx from 'clsx'
import GoldCoin from './GoldCoin'
import TibiaCoin from './TibiaCoin'
import styles from './styles.module.css'

type TransferProps = {
  amount: number
  currency: 'tc' | 'gold'
} & JSX.IntrinsicElements['span']

const Transfer = ({ amount, currency, ...props }: TransferProps) => {
  const Currency = currency === 'gold' ? GoldCoin : TibiaCoin

  return (
    <span {...props}>
      <Currency value={amount} className="pr-3 font-bold" />
      <div
        className={clsx(
          'bg-onSurface/25 relative h-[1px] w-full',
          styles.arrow,
        )}
      />
    </span>
  )
}

export default memo(Transfer)
