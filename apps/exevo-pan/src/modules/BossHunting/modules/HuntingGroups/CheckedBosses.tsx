import { useMemo } from 'react'
import { sortBossesBy } from 'utils'
import { Menu } from 'components/Organisms'
import { MoreIcon, ExpandIcon, ViewedIcon } from 'assets/svgs'
import { premiumBosses } from 'Constants'
import { BossCard } from '../../components'

/* @ ToDo:

- Last checked
- boss dialog
- action
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
  const bossList = useMemo(
    () => [...checkedBosses].sort(sortBossesBy.chance),
    [checkedBosses],
  )

  return (
    <section>
      <h4 className="mb-4">Checked bosses</h4>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 md:grid-cols-2">
        {bossList.map((boss) => (
          <BossCard
            key={boss.name}
            bossStats={boss}
            premium={premiumBosses.set.has(boss.name)}
            cornerElement={
              <div className="ml-auto self-start">
                <Menu
                  items={[
                    {
                      label: 'Details',
                      icon: ExpandIcon,
                    },
                  ]}
                >
                  <MoreIcon className="fill-onSurface h-4 w-4" />
                </Menu>
              </div>
            }
          />
        ))}
      </div>
    </section>
  )
}

export default CheckedBosses
