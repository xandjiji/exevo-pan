/* eslint-disable react/require-default-props */
import { Placement } from '@popperjs/core'
import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

interface TransferIconProps {
  transfer: boolean
  nickname: string
  placement?: Placement
}

const TransferIcon = ({
  transfer,
  nickname,
  placement,
}: TransferIconProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return transfer ? (
    <S.Tooltip
      placement={placement}
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <S.TooltipText id={`transfer-availability-${nickname}`}>
          {common.CharacterCard.transferAvailable}
        </S.TooltipText>
      }
    >
      <S.Server aria-label={common.CharacterCard.transferAvailable} />
    </S.Tooltip>
  ) : (
    <S.Tooltip
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <S.TooltipText id={`transfer-availability-${nickname}`}>
          {common.CharacterCard.transferUnavailable}
        </S.TooltipText>
      }
    >
      <S.NoServer aria-label={common.CharacterCard.transferUnavailable} />
    </S.Tooltip>
  )
}

export default TransferIcon
