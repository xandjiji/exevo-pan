import { dequal } from 'dequal'
import { useState, useRef, useCallback } from 'react'

export const useRecentlyUpdated = (initialCheckedBosses: CheckedBoss[]) => {
  const previousDataRef = useRef(initialCheckedBosses)
  const [recentlyUpdatedBosses, setRecentlyUpdatedBosses] = useState(
    new Set<string>([]),
  )

  return {
    recentlyUpdatedBosses,
    onFreshData: useCallback((freshData: CheckedBoss[]) => {
      setRecentlyUpdatedBosses(
        new Set(
          freshData
            .filter(
              (newData, entryIdx) =>
                !dequal(newData, previousDataRef.current[entryIdx]),
            )
            .map(({ name }) => name),
        ),
      )
      previousDataRef.current = freshData
    }, []),
  }
}
