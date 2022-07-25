import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import { copyToClipboard } from 'utils'
import CopyIcon from 'assets/svgs/copy.svg'
import ValidIcon from 'assets/svgs/valid.svg'
import { CopyButtonProps } from './types'

const CopyButton = ({
  className,
  copyString,
  small = false,
  ...props
}: CopyButtonProps) => {
  const {
    translations: { common },
  } = useTranslations()

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

  return (
    <button
      type="button"
      aria-label={
        clicked ? common.CopyButton.copiedLabel : common.CopyButton.toCopyLabel
      }
      className={clsx(
        'clickable grid place-items-center overflow-hidden rounded',
        className,
      )}
      {...props}
      onClick={handleClick}
    >
      {clicked ? (
        <ValidIcon
          className={clsx(
            'fill-greenHighlight animate-rollIn',
            small ? 'h-4 w-4 p-[1px]' : 'h-6 w-6 p-[3px]',
          )}
        />
      ) : (
        <CopyIcon
          className={clsx(
            'fill-onSurface',
            small ? 'h-4 w-4 p-[1px]' : 'h-6 w-6 p-[3px]',
          )}
        />
      )}
    </button>
  )
}

export default CopyButton
