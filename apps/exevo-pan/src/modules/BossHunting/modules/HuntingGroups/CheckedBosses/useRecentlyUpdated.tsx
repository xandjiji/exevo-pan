/* eslint-disable no-param-reassign */
import { useCallback, useState } from 'react'

type PullData = {
  location: string
  boss: string
  checkedAt: Date
  lastSpawned: Date | null
  memberId: string
}

export const useRecentlyUpdated = (initialCheckedBosses: CheckedBoss[]) => {
  const [lastPull, setLastPull] = useState(new Date())

  const [checkedBosses, setCheckedBosses] = useState(
    initialCheckedBosses.map((item) => ({ ...item, fresh: false })),
  )

  return {
    lastPull,
    checkedBosses,
    onBossCheck: useCallback(
      ({ bossName, location }: { bossName: string; location?: string }) =>
        setCheckedBosses((prev) =>
          prev.map((boss) =>
            boss.name === bossName && boss.location === location
              ? { ...boss, fresh: true, checkedAt: new Date() }
              : boss,
          ),
        ),
      [],
    ),
    onFreshData: useCallback((freshData: PullData[]) => {
      setLastPull(new Date())

      setCheckedBosses((prev) => {
        const next = [...prev]

        next.forEach((bossCheck) => {
          bossCheck.fresh = false

          const updatedBossCheck = freshData.find(
            ({ boss, location }) =>
              boss === bossCheck.name && location === bossCheck.location,
          )

          if (updatedBossCheck) {
            bossCheck.lastSpawned = updatedBossCheck.lastSpawned ?? undefined
            bossCheck.checkedAt = updatedBossCheck.checkedAt
            bossCheck.fresh = true
            bossCheck.checkedBy = 'Member'
          }
        })

        return next
      })
    }, []),
  }
}
