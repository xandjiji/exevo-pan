import clsx from 'clsx'
import { Chip } from 'components/Atoms'
import { ddmmyyy2mmddyyyy } from 'utils'

type DateDiffGridProps = {
  title: string
  dates: string[]
  variant: 'adding' | 'removing'
  onDateSelect: (date: Date) => void
}

const DateDiffGrid = ({
  title,
  variant,
  dates,
  onDateSelect,
}: DateDiffGridProps) => (
  <div className="text-s grid gap-1">
    <strong>{title}</strong>
    <p className="flex flex-wrap gap-1">
      {dates.map((date) => (
        <Chip
          key={date}
          className={clsx(
            'code !bg-background !font-bold',
            { adding: 'text-greenHighlight', removing: 'text-red' }[variant],
          )}
          onClose={() => onDateSelect(new Date(ddmmyyy2mmddyyyy(date)))}
        >
          {date}
        </Chip>
      ))}
    </p>
  </div>
)

export default DateDiffGrid
