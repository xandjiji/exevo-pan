import clsx from 'clsx'
import { LabeledTextBox } from 'components/Atoms'

export const Main = ({
  className,
  ...props
}: JSX.IntrinsicElements['main']) => (
  <main
    className={clsx('inner-container grid place-items-center py-4', className)}
    {...props}
  />
)

export const LabeledCard: typeof LabeledTextBox = ({ className, ...props }) => (
  <LabeledTextBox
    className={clsx(
      'bg-background focus-within:border-primaryVariant grid gap-4 transition-colors',
      className,
    )}
    style={{ padding: '16px 24px' }}
    {...props}
  />
)
