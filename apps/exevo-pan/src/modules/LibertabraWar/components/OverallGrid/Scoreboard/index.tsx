import { memo } from 'react'
import clsx from 'clsx'
import { formatNumberWithCommas } from 'utils'
import { formatDiffValue } from './utils'
import GuildSummary from '../../GuildSummary'
import { ScoreboardProps } from './types'

const Scoreboard = ({
  guildA,
  guildB,
  className,
  ...props
}: ScoreboardProps) => (
  <section
    className={clsx('card p-5 text-center transition-colors', className)}
    {...props}
  >
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-[132px] lg:flex-col lg:gap-12">
      <GuildSummary
        guildName={guildA.name}
        href={guildA.href}
        displayValue={formatNumberWithCommas(guildA.kills)}
        diffText={formatDiffValue(guildA.diff)}
        winning={guildA.kills >= guildB.kills}
        label="Kills"
      />

      <GuildSummary
        guildName={guildB.name}
        href={guildB.href}
        displayValue={formatNumberWithCommas(guildB.kills)}
        diffText={formatDiffValue(guildB.diff)}
        winning={guildB.kills >= guildA.kills}
        label="Kills"
      />
    </div>
  </section>
)

export default memo(Scoreboard)
