import clsx from 'clsx'
import { useUuid } from 'hooks'
import InfoIcon from 'assets/svgs/info.svg'
import { LabeledTextBoxProps } from './types'

const LabeledTextBox = ({
  className,
  children,
  labelText,
  warning = false,
  ...props
}: LabeledTextBoxProps) => {
  const labelId = useUuid()

  return (
    <div
      className={clsx(
        'border-1 relative rounded-md border-solid px-3 pt-2.5 pb-2',
        warning ? 'border-red' : 'border-separator',
        className,
      )}
      aria-labelledby={labelText ? labelId : undefined}
      suppressHydrationWarning
      {...props}
    >
      {labelText && (
        <span
          id={labelId}
          suppressHydrationWarning
          className={clsx(
            'absolute top-0 left-2 flex select-none items-center px-1 text-[9px] font-light uppercase tracking-wider',
            warning ? 'text-red' : 'text-onSurface',
          )}
          style={{ transform: 'translateY(-50%)', backgroundColor: 'inherit' }}
        >
          {labelText}
          {warning && <InfoIcon className="fill-red ml-0.5 h-3 w-3" />}
        </span>
      )}
      {children}
    </div>
  )
}

export default LabeledTextBox
