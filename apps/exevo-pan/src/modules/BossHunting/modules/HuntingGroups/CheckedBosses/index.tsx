import { useState, useMemo, useCallback } from 'react'
import { sortBossesBy } from 'utils'
import { Menu } from 'components/Organisms'
import { MoreIcon, ExpandIcon, ViewedIcon, BlogIcon } from 'assets/svgs'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { premiumBosses } from 'Constants'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'
import { useTimeAgo } from './useTimeAgo'
import { BossCard, BossDialog } from '../../../components'

/* @ ToDo:

- notify
- sort
- search
- accordion?
- testes <BossCard />

- i18n
*/

type CheckedBossesProps = {
  guildId: string
  checkedBosses: CheckedBoss[]
  onCheck: (checkData: TRPCRouteOutputs['markCheckedBoss']) => void
}

const CheckedBosses = ({
  guildId,
  checkedBosses,
  onCheck,
}: CheckedBossesProps) => {
  const [selectedBoss, setSelectedBoss] = useState<string | undefined>()

  const bossList = useMemo(
    () => [...checkedBosses].sort(sortBossesBy.chance),
    [checkedBosses],
  )

  const checkedTimeAgo = useTimeAgo()
  const markCheckedBoss = trpc.markCheckedBoss.useMutation({
    onSuccess: onCheck,
  })

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
                        onSelect: () =>
                          toast.promise(
                            markCheckedBoss.mutateAsync({
                              boss: boss.name,
                              guildId,
                            }),
                            {
                              success: `${boss.name} was marked as checked!`,
                              error: 'Oops! Something went wrong',
                              loading: 'Loading',
                            },
                          ),
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
                    title={`Last time checked (by ${boss.checkedBy})`}
                  >
                    <ViewedIcon className="fill-primaryHighlight mr-0.5 h-4 w-4" />
                    <span>{lastChecked.readable}</span>
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
