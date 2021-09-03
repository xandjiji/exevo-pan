import { getNumberSign, formatNumberWithCommas } from 'utils'
import * as S from './styles'
import { GuildSummaryProps } from './types'

const GuildSummary = ({
  guildName,
  href,
  displayNumber,
  diff,
  label,
  winning,
  ...props
}: GuildSummaryProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.GuildName>
      {guildName}
      <S.Link target="_blank" rel="noreferrer noopener" href={href}>
        <S.ExternalIcon />
      </S.Link>
    </S.GuildName>
    <S.DisplayNumber winning={winning}>
      {formatNumberWithCommas(displayNumber)}
      {!!diff && (
        <S.Diff
          title={`${getNumberSign(diff)}${formatNumberWithCommas(
            Math.abs(diff),
          )} since last update`}
        >
          {getNumberSign(diff)}
          {formatNumberWithCommas(Math.abs(diff))}
        </S.Diff>
      )}
    </S.DisplayNumber>
    <S.Label>{label}</S.Label>
  </S.Wrapper>
)

export default GuildSummary
