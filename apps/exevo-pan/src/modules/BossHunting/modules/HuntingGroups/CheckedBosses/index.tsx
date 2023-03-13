import { useState, useMemo, useCallback } from 'react'
import { sortBossesBy } from 'utils'
import { Menu } from 'components/Organisms'
import { MoreIcon, ExpandIcon, ViewedIcon, BlogIcon } from 'assets/svgs'
import { premiumBosses } from 'Constants'
import { useTimeAgo } from './useTimeAgo'
import { BossCard, BossDialog } from '../../../components'

/* @ ToDo:

- action
- notify
- sort
- search
- premium
- accordion?
- testes <BossCard />

- i18n
*/

type CheckedBossesProps = {
  checkedBosses: CheckedBoss[]
}

const CheckedBosses = ({ checkedBosses }: CheckedBossesProps) => {
  const [selectedBoss, setSelectedBoss] = useState<string | undefined>()

  const bossList = useMemo(
    () => [...checkedBosses].sort(sortBossesBy.chance),
    [checkedBosses],
  )

  const checkedTimeAgo = useTimeAgo()

  return (
    <section>
      <h4 className="mb-4">Checked bosses</h4>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 md:grid-cols-2">
        {bossList.map((boss) => {
          const lastChecked = checkedTimeAgo(boss.checkedAt)

          return (
            <BossCard
              key={boss.name}
              bossStats={boss}
              premium={premiumBosses.set.has(boss.name)}
              cornerElement={
                <div className="ml-auto self-start">
                  <Menu
                    offset={[0, 8]}
                    items={[
                      {
                        label: 'Details',
                        icon: ExpandIcon,
                        onSelect: () => setSelectedBoss(boss.name),
                      },
                      {
                        label: 'Notify group',
                        icon: BlogIcon,
                      },
                      {
                        label: 'Mark as checked',
                        icon: ViewedIcon,
                      },
                    ]}
                  >
                    <MoreIcon className="fill-onSurface h-4 w-4" />
                  </Menu>
                </div>
              }
              bottomElement={
                lastChecked ? (
                  <p
                    className="flex items-center gap-1"
                    title="Last time checked"
                  >
                    <ViewedIcon className="fill-primaryHighlight mr-0.5 h-4 w-4" />
                    <span>3 minutes ago</span>
                  </p>
                ) : undefined
              }
            />
          )
        })}
      </div>

      <BossDialog
        bossName={selectedBoss}
        onClose={useCallback(() => setSelectedBoss(undefined), [])}
      />
    </section>
  )
}

export default CheckedBosses
