import { useState, useCallback } from 'react'
import { OnLoadState } from './types'

const useOnImageLoad = (): OnLoadState => {
  const [loaded, setLoaded] = useState(false)

  const onLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const { src } = event.target as HTMLImageElement
      if (src.indexOf('data:image/gif;base64') < 0) {
        setLoaded(true)
      }
    },
    [],
  )

  return [loaded, onLoad]
}

export default useOnImageLoad
