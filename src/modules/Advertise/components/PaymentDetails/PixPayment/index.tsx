import { useState, useEffect } from 'react'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'
import { generateQrCode } from './utils'

const PixPayment = (): JSX.Element => {
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
      <S.Text>Please complete your order paying the following Pix code:</S.Text>
      <S.Payload>
        {txKey}
        <S.CopyButton copyString={txKey as string} />
      </S.Payload>
      <S.QRText>or using the following QR Code:</S.QRText>
      <S.QrCode src={qrCode} />
    </S.Wrapper>
  )
}

export default PixPayment
