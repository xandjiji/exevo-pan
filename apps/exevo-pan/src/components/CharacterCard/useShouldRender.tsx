import { useState, useMemo, useEffect } from 'react'
import { useOnScreen } from 'hooks'
import { debounce } from 'utils'

const UPDATE_SCREEN_DELAY = 200
const LAZY_LOAD_OVERSCAN = '270px'

const useShouldRender = (
  isLazy: boolean,
  ref: React.MutableRefObject<HTMLDivElement | undefined>,
): boolean => {
  if (!isLazy) return true

  const onScreen = useOnScreen(ref, LAZY_LOAD_OVERSCAN)

  const [shouldRender, setShouldRender] = useState(true)

  const debouncedSetRender = useMemo(
    () =>
      debounce((value: boolean) => {
        setShouldRender(value)
      }, UPDATE_SCREEN_DELAY),
    [],
  )

  useEffect(() => {
    debouncedSetRender(onScreen)
  }, [onScreen])

  return shouldRender
}

export default useShouldRender
