import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import ArrowIcon from 'assets/svgs/arrowBack.svg'
import { DrawerHeadProps } from './types'

export default ({
  onClose,
  children,
  className,
  ...props
}: DrawerHeadProps) => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <div
      className={clsx(
        'bg-primary inner-padding flex h-[60px] flex-none items-center shadow-md',
        className,
      )}
      {...props}
    >
      {onClose && (
        <button
          className="clickable text-none mr-6 h-[30px] w-[30px] rounded p-[2px]"
          type="button"
          tabIndex={0}
          aria-label={common.CloseDrawerLabel}
          onClick={onClose}
        >
          <ArrowIcon className="fill-onPrimary" />
        </button>
      )}
      <div className="text-onPrimary w-full text-base tracking-wider">
        {children}
      </div>
    </div>
  )
}
