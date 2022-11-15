import clsx from 'clsx'
import LabeledTextBox from '../LabeledTextBox'
import { LabeledCardProps } from './types'

const LabeledCard = ({
  className,
  noBackground = false,
  ...props
}: LabeledCardProps) => (
  <LabeledTextBox
    className={clsx(
      'focus-within:border-primaryVariant grid gap-4 transition-colors',
      !noBackground && 'bg-background',
      className,
    )}
    style={{ padding: '16px 24px' }}
    {...props}
  />
)

export default LabeledCard
