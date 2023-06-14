import { useTranslations } from 'contexts/useTranslation'
import { forwardRef, Ref, useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import { copyToClipboard } from 'utils'
import { CopyIcon, AnchorIcon, ValidIcon } from 'assets/svgs'
import { CopyButtonProps } from './types'

const CopyButton = (
  {
    className,
    copyString,
    linkIcon = false,
    variant = 'default',
    iconClassname,
    ...props
  }: CopyButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const { common } = useTranslations()

  const [clicked, setClicked] = useState(false)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { onClick } = props
      copyToClipboard(copyString)
      onClick?.(event)
      setClicked(true)
    },
    [copyString],
  )

  useEffect(() => setClicked(false), [copyString])

  const Icon = linkIcon ? AnchorIcon : CopyIcon

  return (
    <button
      ref={ref}
      type="button"
      aria-label={
        clicked ? common.CopyButton.copiedLabel : common.CopyButton.toCopyLabel
      }
      className={clsx(
        'grid cursor-pointer place-items-center overflow-hidden',
        !iconClassname && 'clickable rounded',
        className,
      )}
      {...props}
      onClick={handleClick}
    >
      {clicked ? (
        <ValidIcon
          className={clsx(
            'fill-greenHighlight animate-rollIn',
            iconClassname ??
              {
                small: 'h-4 w-4 p-[1px]',
                default: 'h-6 w-6 p-[3px]',
                big: 'h-7 w-7 p-0.5',
              }[variant],
          )}
        />
      ) : (
        <Icon
          className={clsx(
            'fill-onSurface',
            iconClassname ??
              {
                small: 'h-4 w-4 p-[1px]',
                default: 'h-6 w-6 p-[3px]',
                big: 'h-7 w-7 p-0.5',
              }[variant],
          )}
        />
      )}
    </button>
  )
}

export default forwardRef(CopyButton)
