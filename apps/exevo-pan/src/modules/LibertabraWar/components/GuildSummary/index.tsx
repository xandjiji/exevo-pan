import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { GuildSummaryProps } from './types'

const GuildSummary = ({
  guildName,
  href,
  displayValue,
  diffText,
  label,
  winning,
  ...props
}: GuildSummaryProps): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <S.GuildName>
        {guildName}
        <S.Link target="_blank" rel="noreferrer noopener" href={href}>
          <S.ExternalIcon />
          {war.GuildSummary.linkText}
        </S.Link>
      </S.GuildName>
      <S.DisplayNumber winning={winning}>
        {displayValue}
        {!!diffText && (
          <S.Diff title={`${diffText} ${war.GuildSummary.diffTitleSuffix}`}>
            {diffText}
          </S.Diff>
        )}
      </S.DisplayNumber>
      <S.Label>{label}</S.Label>
    </S.Wrapper>
  )
}

export default GuildSummary
