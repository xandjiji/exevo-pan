import clsx from 'clsx'
import { RadioButton } from 'components/Atoms'
import { MethodButtonProps } from './types'

const MethodButton = ({
  active,
  icon,
  children,
  className,
  style,
  ...props
}: MethodButtonProps) => (
  <button
    type="button"
    className={clsx(
      'bg-surface text-tsm text-onSurface hover:bg-separator/20 block w-full cursor-pointer border-solid py-2 px-4 tracking-widest transition-all',
      active ? 'border-primary' : 'border-transparent',
      className,
    )}
    style={{ borderWidth: 0, borderLeftWidth: 6, ...style }}
    {...props}
  >
    <RadioButton active={active} tabIndex={-1} aria-label={props['aria-label']}>
      <div className="ml-2 flex items-center gap-1.5">
        {icon}
        {children}
      </div>
    </RadioButton>
  </button>
)

export default MethodButton
