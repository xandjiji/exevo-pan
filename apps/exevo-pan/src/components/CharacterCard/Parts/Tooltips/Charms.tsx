import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'data-dictionary/dist/dictionaries/charm'
import Lister from './Lister'
import * as S from './styles'
import { TooltipProps } from './types'

const CharacterCharms = ({ items, ...props }: TooltipProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.charms}
      content={<Lister partialList={items} fullList={tokens} />}
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Charm />
        Charms: {items.length}/{tokens.length}
      </S.TitleWrapper>
    </Tooltip>
  )
}

export default memo(CharacterCharms)
