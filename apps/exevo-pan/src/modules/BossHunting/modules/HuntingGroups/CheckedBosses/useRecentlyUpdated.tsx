import { dequal } from 'dequal'
import { useState, useRef, useCallback } from 'react'

export const useRecentlyUpdated = (initialCheckedBosses: CheckedBoss[]) => {
  const previousDataRef = useRef(initialCheckedBosses)
  const [recentlyUpdatedBosses, setRecentlyUpdatedBosses] = useState<
    { name: string; location: string }[]
  >([])

  return {
    recentlyUpdatedBosses,
    onFreshData: useCallback((freshData: CheckedBoss[]) => {
      setRecentlyUpdatedBosses(
        freshData
          .filter(
            (newData, entryIdx) =>
              !dequal(newData, previousDataRef.current[entryIdx]),
          )
          .map(({ name, location }) => ({ name, location })),
      )
      previousDataRef.current = freshData
    }, []),
  }
}
