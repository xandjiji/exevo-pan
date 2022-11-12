import { useState, useCallback } from 'react'
import { OnLoadState } from './types'

const useOnImageLoad = (): OnLoadState => {
  const [loaded, setLoaded] = useState(false)
  const onLoadingComplete = useCallback(() => setLoaded(true), [])
  return [loaded, onLoadingComplete]
}

export default useOnImageLoad
