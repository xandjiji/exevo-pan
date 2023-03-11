import { useMemo } from 'react'
import BossCard from 'components/BossCard'
import { sortBossesBy } from 'utils'
import { ViewedIcon } from 'assets/svgs'
import { premiumBosses } from 'Constants'

/* @ ToDo:

- Last checked
- action
- sort
- search
- premium
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {bossList.map((boss) => (
          <BossCard
            key={boss.name}
            bossStats={boss}
            premium={premiumBosses.set.has(boss.name)}
            actionLabel="Mark as checked"
            action={() => {}}
            actionIcon={
              <ViewedIcon className="fill-primaryHighlight h-5 w-5" />
            }
          />
        ))}
      </div>
    </section>
  )
}

export default CheckedBosses
