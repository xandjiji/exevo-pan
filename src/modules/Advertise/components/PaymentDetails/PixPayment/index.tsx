import { useTranslations } from 'contexts/useTranslation'
import { useState, useEffect } from 'react'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'
import { generateQrCode } from './utils'

const PixPayment = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { selectedCharacter, selectedDates } = useForm()

  const [qrCode, setQrCode] = useState<string | undefined>()
  const [txKey, setTxKey] = useState<string | undefined>()

  useEffect(() => {
    const generateAndSetQrCode = async () => {
      const pixObject = await generateQrCode({
        txId: selectedCharacter?.id ?? 0,
        daysAmount: selectedDates.length,
      })
      setQrCode(pixObject.qrCode)
      setTxKey(pixObject.payload)
    }

    generateAndSetQrCode()
  }, [])

  return (
    <S.Wrapper>
      <S.Text>{advertise.PaymentDetails.PixPayment.codeText}</S.Text>
      <S.Payload>
        {txKey}
        <S.CopyButton copyString={txKey as string} />
      </S.Payload>
      <S.QRText>{advertise.PaymentDetails.PixPayment.qrText}</S.QRText>
      <S.QrCode src={qrCode} />
    </S.Wrapper>
  )
}

export default PixPayment
