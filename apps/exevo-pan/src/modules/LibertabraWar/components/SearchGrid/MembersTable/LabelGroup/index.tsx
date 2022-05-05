import { LabelGroupProps } from './types'

const LabelGroup = ({
  label,
  htmlFor,
  children,
  ...props
}: LabelGroupProps) => (
  <div {...props}>
    <label htmlFor={htmlFor} className="mb-2 block">
      {label}
    </label>
    {children}
  </div>
)

export default LabelGroup
