import clsx from 'clsx'
import { LabelGroupProps } from './types'

const LabelGroup = ({
  label,
  htmlFor,
  className,
  children,
  ...props
}: LabelGroupProps) => (
  <div {...props}>
    <label htmlFor={htmlFor} className={clsx('mb-2 block', className)}>
      {label}
    </label>
    {children}
  </div>
)

export default LabelGroup
