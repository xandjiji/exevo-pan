import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'DataDictionary/dictionaries/imbuement'
import ListedItems from './ListedItems'
import * as S from './styles'
import { TooltipProps } from './types'

const CharacterImbuements = ({
  items,
  ...props
}: TooltipProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const characterImbuements = useMemo(
    () => new Set<string>([...items]),
    [items],
  )

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.imbuements}
      content={
        <ListedItems fullList={tokens} characterSet={characterImbuements} />
      }
    >
      <S.Wrapper {...props}>
        <S.ImbuementIcon />
        {`Imbuements: ${items.length}/${tokens.length}`}
      </S.Wrapper>
    </Tooltip>
  )
}

export default CharacterImbuements
