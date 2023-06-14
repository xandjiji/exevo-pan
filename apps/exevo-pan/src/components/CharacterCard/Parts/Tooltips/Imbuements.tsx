import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'data-dictionary/dist/dictionaries/imbuement'
import Lister from './Lister'
import * as S from './atoms'
import { TooltipProps } from './types'

const MAX_LINES = 12

const CharacterImbuements = ({ items, placement, ...props }: TooltipProps) => {
  const { common } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.imbuements}
      content={
        <Lister maxLines={MAX_LINES} partialList={items} fullList={tokens} />
      }
      placement={placement}
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Imbuement />
        Imbuements: {items.length}/{tokens.length}
      </S.TitleWrapper>
    </Tooltip>
  )
}

export default memo(CharacterImbuements)
