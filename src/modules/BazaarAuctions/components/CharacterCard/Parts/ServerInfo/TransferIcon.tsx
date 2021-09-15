import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

interface TransferIconProps {
  transfer: boolean
  nickname: string
}

const TransferIcon = ({
  transfer,
  nickname,
}: TransferIconProps): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  return transfer ? (
    <S.Tooltip
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <S.TooltipText id={`transfer-availability-${nickname}`}>
          {homepage.CharacterCard.transferAvailable}
        </S.TooltipText>
      }
    >
      <S.Server aria-label={homepage.CharacterCard.transferAvailable} />
    </S.Tooltip>
  ) : (
    <S.Tooltip
      aria-labelledby={`transfer-availability-${nickname}`}
      content={
        <S.TooltipText id={`transfer-availability-${nickname}`}>
          {homepage.CharacterCard.transferUnavailable}
        </S.TooltipText>
      }
    >
      <S.NoServer aria-label={homepage.CharacterCard.transferUnavailable} />
    </S.Tooltip>
  )
}

export default TransferIcon
