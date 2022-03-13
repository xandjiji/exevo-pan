import { memo, useState, useRef, useEffect } from 'react'
import { useOnScreen } from 'hooks'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { Wrapper } from './styles'
import { StickerProps } from './types'

const Sticker = ({
  localStorageKey,
  children,
  ...props
}: StickerProps): JSX.Element | null => {
  const [hasSticker] = useState(() =>
    getFromLocalStorage(localStorageKey, true),
  )

  const ref = useRef<HTMLSpanElement>()
  const onScreen = useOnScreen<HTMLSpanElement>(ref)

  useEffect(() => {
    saveToLocalStorage(localStorageKey, false)
  }, [onScreen])

  if (!hasSticker) return null
  return (
    <Wrapper {...props} ref={ref as React.RefObject<HTMLSpanElement>}>
      {children}
    </Wrapper>
  )
}

export default memo(Sticker)
