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

export const GridTextSeparator = ({
  className,
  ...props
}: JSX.IntrinsicElements['p']) => (
  <p
    className={clsx(
      className,
      'text-tsm border-separator border-1 col-span-full pb-1.5',
    )}
    style={{ borderBottomStyle: 'solid' }}
    {...props}
  />
)
