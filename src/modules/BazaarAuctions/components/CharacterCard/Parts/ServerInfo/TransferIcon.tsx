import { useTranslation } from 'next-i18next'
import * as S from './styles'

interface TransferIconProps {
  transfer: boolean
  nickname: string
}

const TransferIcon = ({
  transfer,
  nickname,
}: TransferIconProps): JSX.Element => {
  const { t } = useTranslation('homepage')

  return transfer ? (
    <S.Tooltip
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <S.TooltipText id={`transfer-availability-${nickname}`}>
          {t('CharacterCard.transferAvailable')}
        </S.TooltipText>
      }
    >
      <S.Server aria-label={t('CharacterCard.transferAvailable')} />
    </S.Tooltip>
  ) : (
    <S.Tooltip
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <S.TooltipText id={`transfer-availability-${nickname}`}>
          {t('CharacterCard.transferUnavailable')}
        </S.TooltipText>
      }
    >
      <S.NoServer aria-label={t('CharacterCard.transferUnavailable')} />
    </S.Tooltip>
  )
}

export default TransferIcon
