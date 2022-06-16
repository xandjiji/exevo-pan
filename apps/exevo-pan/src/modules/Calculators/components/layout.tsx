import clsx from 'clsx'

export const Card = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'border-separator border-1 grid gap-4 rounded-md border-solid p-4 px-6',
      className,
    )}
    {...props}
  />
)
