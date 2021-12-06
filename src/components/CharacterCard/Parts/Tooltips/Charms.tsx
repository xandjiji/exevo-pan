import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'DataDictionary/dictionaries/charm'
import * as S from './styles'
import { TooltipProps } from './types'

const CharacterQuests = ({ items, ...props }: TooltipProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const characterCharms = useMemo(() => new Set<string>([...items]), [items])

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.charms}
      content={tokens.map((charm) => (
        <S.Item key={charm} active={characterCharms.has(charm)}>
          {charm}
        </S.Item>
      ))}
    >
      <S.Wrapper {...props}>
        <S.CharmIcon />
        {`Charms: ${items.length}/${tokens.length}`}
      </S.Wrapper>
    </Tooltip>
  )
}

export default CharacterQuests
