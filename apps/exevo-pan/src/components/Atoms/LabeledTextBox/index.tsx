import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useUuid } from 'hooks'
import Image from 'next/image'
import warningSrc from 'assets/warning.png'
import { LabeledTextBoxProps } from './types'

const LabeledTextBox = ({
  className,
  children,
  labelText,
  warning = false,
  ...props
}: LabeledTextBoxProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const labelId = useUuid()

  return (
    <div
      className={clsx(
        'border-1 relative rounded-md border-solid px-3 pt-[10px] pb-2',
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
            'bg-surface absolute top-0 left-2 flex select-none items-center px-1 text-[9px] font-light uppercase tracking-wider',
            warning ? 'text-red' : 'text-onSurface',
          )}
          style={{ transform: 'translateY(-50%)' }}
        >
          {labelText}
          {warning && (
            <Image
              src={warningSrc}
              title={common.WarningLabel}
              unoptimized
              className="warning-icon"
            />
          )}
        </span>
      )}
      {children}
    </div>
  )
}

export default LabeledTextBox
