import { useState, useEffect } from 'react'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'
import { generateQrCode } from './utils'

const PixPayment = (): JSX.Element => {
  const { uuid, selectedCharacter, email, selectedDates } = useForm()

  const [qrCode, setQrCode] = useState<string | undefined>()
  const [txKey, setTxKey] = useState<string | undefined>()

  useEffect(() => {
    const generateAndSetQrCode = async () => {
      const pixObject = await generateQrCode({
        uuid,
        nickname: selectedCharacter?.nickname ?? '',
        email: email.value,
        daysAmount: selectedDates.length,
      })
      setQrCode(pixObject.qrCode)
      setTxKey(pixObject.payload)
    }

    generateAndSetQrCode()
  }, [])

  return (
    <S.Wrapper>
      <h1>{txKey}</h1>
      <img src={qrCode} alt="QR Code" />
    </S.Wrapper>
  )
}

export default PixPayment
