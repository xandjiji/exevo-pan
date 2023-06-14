import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import GuildSummary from '../../GuildSummary'
import { formatDisplayValue } from './utils'
import styles from './styles.module.css'
import { ScoreboardXPProps } from './types'

const ScoreboardXP = ({
  guildA,
  guildB,
  className,
  ...props
}: ScoreboardXPProps) => {
  const { war } = useTranslations()

  return (
    <section
      className={clsx('card p-5 text-center transition-colors', className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-6 xl:flex-row xl:justify-around">
        <GuildSummary
          className={styles.summary}
          guildName={guildA.name}
          href={guildA.href}
          displayValue={formatDisplayValue(guildA.todayDiff)}
          winning={guildA.todayDiff >= 0}
          label={war.GuildXPGrid.ScoreboardXP.summaryLabel}
        />

        <GuildSummary
          className={styles.summary}
          guildName={guildB.name}
          href={guildB.href}
          displayValue={formatDisplayValue(guildB.todayDiff)}
          winning={guildB.todayDiff >= 0}
          label={war.GuildXPGrid.ScoreboardXP.summaryLabel}
        />
      </div>
    </section>
  )
}

export default memo(ScoreboardXP)
