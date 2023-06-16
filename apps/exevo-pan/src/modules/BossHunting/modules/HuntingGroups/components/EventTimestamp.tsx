import clsx from 'clsx'

const EventTimestamp = ({
  date,
  className,
  ...props
}: { date: Date } & React.ComponentProps<'span'>) => (
  <span
    className={clsx('text-tsm font-light opacity-60', className)}
    {...props}
  >
    {date.toLocaleString('pt-BR', { hour12: false })}
  </span>
)

export default EventTimestamp
