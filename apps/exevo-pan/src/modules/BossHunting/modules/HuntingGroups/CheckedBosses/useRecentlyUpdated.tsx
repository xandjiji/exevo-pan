/* eslint-disable no-param-reassign */
import { useCallback, useState } from 'react'
import { useGuildData } from '../contexts/useGuildData'

type PullData = {
  location: string
  boss: string
  checkedAt: Date
  lastSpawned: Date | null
  memberId: string
}

export const useRecentlyUpdated = (initialCheckedBosses: CheckedBoss[]) => {
  const [lastCheckDate, setLastCheckDate] = useState(
    () =>
      [...initialCheckedBosses].sort(
        (a, b) =>
          (b.checkedAt ? +b.checkedAt : 0) - (a.checkedAt ? +a.checkedAt : 0),
      )[0]?.checkedAt ?? new Date(0),
  )

  const [checkedBosses, setCheckedBosses] = useState(
    initialCheckedBosses.map((item) => ({ ...item, fresh: false })),
  )

  const { members } = useGuildData()

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
              ({ boss, location, checkedAt }) =>
                boss === bossCheck.name &&
                location === bossCheck.location &&
                +checkedAt !==
                  (bossCheck.checkedAt ? +bossCheck.checkedAt : -1),
            )

            if (updatedBossCheck) {
              bossCheck.lastSpawned = updatedBossCheck.lastSpawned ?? undefined
              bossCheck.checkedAt = updatedBossCheck.checkedAt
              bossCheck.checkedBy =
                members.find(({ id }) => id === updatedBossCheck.memberId)
                  ?.name ?? 'Member'
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
      [lastCheckDate, members],
    ),
  }
}
