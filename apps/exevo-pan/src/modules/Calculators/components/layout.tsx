import clsx from 'clsx'
import { LabeledTextBox } from 'components/Atoms'
import { LabeledCardProps } from './types'

export const Main = ({
  className,
  ...props
}: JSX.IntrinsicElements['main']) => (
  <main
    className={clsx(
      'inner-container grid place-content-start justify-center py-4 md:pt-0',
      className,
    )}
    {...props}
  />
)

export const LabeledCard = ({
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

export const Spacer = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    role="none"
    className={clsx('bg-separator/40 h-[1px] w-full', className)}
    {...props}
  />
)
