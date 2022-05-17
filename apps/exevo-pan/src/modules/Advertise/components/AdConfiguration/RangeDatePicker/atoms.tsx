import clsx from 'clsx'
import { DayProps } from './types'

export const Day = ({ today = false, className, ...props }: DayProps) => (
  <button
    type="button"
    className={clsx(
      'disabled:text-separator text-onSurface cursor-pointer rounded-md py-2 px-1 text-base shadow-[2px_2px_2px_0px_rgba(0,0,0,0.09)] transition-all hover:shadow active:shadow-inner disabled:pointer-events-none disabled:shadow-none',
      today ? 'font-bold' : 'font-light',
      props['aria-selected'] && 'bg-primaryVariant',
      className,
    )}
    {...props}
  />
)
