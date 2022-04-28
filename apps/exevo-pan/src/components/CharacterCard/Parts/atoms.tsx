import clsx from 'clsx'
import { LabeledTextBox as BaseLabeledTextBox } from 'components/Atoms'

export const LabeledTextBox: typeof BaseLabeledTextBox = ({
  className,
  ...props
}) => (
  <BaseLabeledTextBox
    className={clsx('text-s flex items-center gap-1', className)}
    {...props}
  />
)
