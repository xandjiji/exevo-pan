import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'data-dictionary/dist/dictionaries/charm'
import { formatNumberWithCommas } from 'utils'
import Lister from './Lister'
import * as S from './styles'
import { CharacterCharmsProps } from './types'

const CharacterCharms = ({
  charmInfo,
  items,
  placement,
  ...props
}: CharacterCharmsProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.charms}
      content={<Lister partialList={items} fullList={tokens} />}
      placement={placement}
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Charm />
        Charms: {items.length}/{tokens.length}
        {charmInfo && (
          <>
            {' '}
            (
            <strong style={{ marginRight: 2 }}>
              {formatNumberWithCommas(charmInfo.total)}
            </strong>{' '}
            total points,
            <strong style={{ margin: 2 }}>
              {formatNumberWithCommas(charmInfo.unspent)}
            </strong>{' '}
            unspent)
          </>
        )}
      </S.TitleWrapper>
    </Tooltip>
  )
}

export default memo(CharacterCharms)
