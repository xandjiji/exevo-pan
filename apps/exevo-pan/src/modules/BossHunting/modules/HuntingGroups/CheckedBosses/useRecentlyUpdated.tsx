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
  const [lastCheckDate, setLastCheckDate] = useState(new Date(0))

  const [checkedBosses, setCheckedBosses] = useState(
    initialCheckedBosses.map((item) => ({ ...item, fresh: false })),
  )

  return {
    lastCheckDate,
    checkedBosses,
    onFreshData: useCallback(
      (freshData: PullData[]) => {
        let nextLastCheckDate = lastCheckDate

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
              bossCheck.checkedBy = 'Member'
              bossCheck.fresh = +lastCheckDate > 0
            }

            if (
              bossCheck.checkedAt &&
              bossCheck.checkedAt > nextLastCheckDate
            ) {
              nextLastCheckDate = bossCheck.checkedAt
            }
          })

          return next
        })

        setLastCheckDate(nextLastCheckDate)
      },
      [lastCheckDate],
    ),
  }
}
