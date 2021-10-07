import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

const TransactionId = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.Label>{advertise.PaymentDetails.TransactionIdLabel}</S.Label>
      <S.Id>{children}</S.Id>
    </S.Wrapper>
  )
}

export default TransactionId
