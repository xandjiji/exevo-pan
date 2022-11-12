import clsx from 'clsx'

export const Button = ({
  className,
  ...props
}: JSX.IntrinsicElements['button']) => (
  <button
    type="button"
    className={clsx('clickable grid place-items-center rounded', className)}
    {...props}
  />
)
