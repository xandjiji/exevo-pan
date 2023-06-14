import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'data-dictionary/dist/dictionaries/charm'
import { formatNumberWithCommas } from 'utils'
import Lister from './Lister'
import * as S from './atoms'
import { CharacterCharmsProps } from './types'

const MAX_LINES = 10

const CharacterCharms = ({
  charmInfo,
  items,
  placement,
  ...props
}: CharacterCharmsProps) => {
  const { common } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.charms}
      content={
        <Lister maxLines={MAX_LINES} partialList={items} fullList={tokens} />
      }
      placement={placement}
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Charm />
        Charms: {items.length}/{tokens.length}
        {charmInfo && (
          <>
            {' '}
            (
            <strong style={{ marginRight: 3 }}>
              {formatNumberWithCommas(charmInfo.total)}
            </strong>{' '}
            total points,
            <strong style={{ margin: '0 3px' }}>
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
