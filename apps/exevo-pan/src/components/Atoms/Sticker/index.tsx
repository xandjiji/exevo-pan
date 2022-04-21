import { memo, useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { useOnScreen } from 'hooks'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { StickerProps } from './types'

const Sticker = ({
  localStorageKey,
  className,
  children,
  ...props
}: StickerProps) => {
  const [hasSticker] = useState(() =>
    getFromLocalStorage(localStorageKey, true),
  )

  const ref = useRef<HTMLSpanElement>(null)
  const onScreen = useOnScreen<HTMLSpanElement>(ref)

  useEffect(() => {
    saveToLocalStorage(localStorageKey, false)
  }, [onScreen])

  if (!hasSticker) return null
  return (
    <span
      className={clsx(
        'bg-battleYellow border-1 border-separator rounded-md border-dashed p-[3px] text-[9px] uppercase tracking-wider text-black opacity-80',
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </span>
  )
}

export default memo(Sticker)
