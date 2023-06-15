import clsx from 'clsx'

const TableIconWrapper = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={clsx('h-6 w-6 align-middle opacity-70', className)}
    {...props}
  />
)

export default TableIconWrapper
