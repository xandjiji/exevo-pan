import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'DataDictionary/dictionaries/charm'
import ListedItems from './ListedItems'
import * as S from './styles'
import { TooltipProps } from './types'

const CharacterCharms = ({ items, ...props }: TooltipProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const characterCharms = useMemo(() => new Set<string>([...items]), [items])

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.charms}
      content={<ListedItems fullList={tokens} characterSet={characterCharms} />}
    >
      <S.Wrapper {...props}>
        <S.CharmIcon />
        {`Charms: ${items.length}/${tokens.length}`}
      </S.Wrapper>
    </Tooltip>
  )
}

export default CharacterCharms
