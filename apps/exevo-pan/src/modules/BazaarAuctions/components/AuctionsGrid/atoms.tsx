import clsx from 'clsx'

export const Button = ({
  className,
  ...props
}: JSX.IntrinsicElements['button']) => (
  <button
    type="button"
    className={clsx(
      'grid place-items-center rounded',
      !props.disabled && 'clickable',
      className,
    )}
    {...props}
  />
)
