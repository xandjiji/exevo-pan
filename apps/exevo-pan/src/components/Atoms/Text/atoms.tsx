import clsx from 'clsx'

export const Flex = ({
  className,
  ...props
}: JSX.IntrinsicElements['span']) => (
  <span
    className={clsx(
      'child:shrink-0 inline-flex items-baseline justify-center gap-1 whitespace-nowrap',
      className,
    )}
    {...props}
  />
)
