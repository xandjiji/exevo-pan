import clsx from 'clsx'
import { useState, useMemo, useCallback } from 'react'
import { Input, Checkbox } from 'components/Atoms'
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

- hide (recently checked/my ignored bosses)
- accordion?
- testes <BossCard />

- i18n
*/

type CheckedBossesProps = {
  guildId: string
  checkedBosses: CheckedBoss[]
  onCheck?: (checkData: TRPCRouteOutputs['markCheckedBoss']) => void
  onNotify?: (boss: string) => void
}

const CheckedBosses = ({
  guildId,
  checkedBosses,
  onCheck,
  onNotify,
}: CheckedBossesProps) => {
  const [selectedBoss, setSelectedBoss] = useState<string | undefined>()
  const [bossQuery, setBossQuery] = useState('')
  const [hideNoChance, setHideNoChance] = useState(false)

  const bossList = useMemo(
    () =>
      [...checkedBosses]
        .filter(({ name, currentChance, daysLeftForPossibleSpawns }) => {
          if (bossQuery && !name.toLowerCase().includes(bossQuery)) {
            return false
          }

          if (hideNoChance) {
            if (daysLeftForPossibleSpawns) {
              if (
                !daysLeftForPossibleSpawns.some((daysLeft) => daysLeft <= 0)
              ) {
                return false
              }
            } else if (!currentChance) {
              return false
            }
          }

          return true
        })
        .sort(sortBossesBy.chance),
    [checkedBosses, bossQuery, hideNoChance],
  )

  const checkedTimeAgo = useTimeAgo()
  const markCheckedBoss = trpc.markCheckedBoss.useMutation({
    onSuccess: onCheck,
  })

  return (
    <section>
      <h4>Checked bosses</h4>

      <div className="my-4 flex flex-col gap-2 md:flex-row md:items-end md:gap-6">
        <Input
          allowClear
          label="Search"
          placeholder="e.g. 'Yeti', 'Mr. Punish'"
          className="md:max-w-[200px]"
          onChange={(e) => setBossQuery(e.target.value.toLowerCase())}
        />

        <div className="flex flex-col gap-2 md:mb-3 md:flex-row md:gap-4">
          <Checkbox
            label="Hide no chance"
            checked={hideNoChance}
            onClick={() => setHideNoChance((prev) => !prev)}
          />
          <Checkbox label="Hide recently checked" />
          <Checkbox label="Hide my ignored bosses" />
        </div>
      </div>

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
                        onSelect: () => onNotify?.(boss.name),
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
                    <ViewedIcon
                      className={clsx(
                        'mr-0.5 h-4 w-4',
                        lastChecked.recent ? 'fill-separator' : 'fill-red',
                      )}
                    />
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
