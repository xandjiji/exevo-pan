import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { formatDisplayValue } from './utils'
import * as S from './styles'
import { ScoreboardXPProps } from './types'

const ScoreboardXP = ({
  guildA,
  guildB,
  ...props
}: ScoreboardXPProps): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <S.GuildWrapper>
        <S.GuildSummary
          guildName={guildA.name}
          href={guildA.href}
          displayValue={formatDisplayValue(guildA.todayDiff)}
          winning={guildA.todayDiff >= 0}
          label={war.GuildXPGrid.ScoreboardXP.summaryLabel}
        />

        <S.GuildSummary
          guildName={guildB.name}
          href={guildB.href}
          displayValue={formatDisplayValue(guildB.todayDiff)}
          winning={guildB.todayDiff >= 0}
          label={war.GuildXPGrid.ScoreboardXP.summaryLabel}
        />
      </S.GuildWrapper>
    </S.Wrapper>
  )
}

export default memo(ScoreboardXP)
