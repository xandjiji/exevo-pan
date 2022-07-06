/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx'

const Label = ({ className, ...props }: JSX.IntrinsicElements['label']) => (
  <label
    className={clsx(
      'text-tsm text-onSurface block font-light tracking-wide',
      className,
    )}
    {...props}
  />
)

export default Label
