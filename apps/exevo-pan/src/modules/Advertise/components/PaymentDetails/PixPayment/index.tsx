import { useTranslations } from 'contexts/useTranslation'
import { useState, useEffect } from 'react'
import { CopyButton } from 'components/Atoms'
import { useForm } from '../../../contexts/Form'
import { generateQrCode } from './utils'
import { PixPaymentProps } from './types'

const PixPayment = ({ isPro }: PixPaymentProps) => {
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
        isPro,
      })
      setQrCode(pixObject.qrCode)
      setTxKey(pixObject.payload)
    }

    generateAndSetQrCode()
  }, [])

  return (
    <div>
      <p className="text-s mb-1.5">
        {advertise.PaymentDetails.PixPayment.codeText}
      </p>
      <span className="code flex items-center gap-1.5 break-all text-xs">
        {txKey}
        <CopyButton
          copyString={txKey as string}
          className="!bg-primary child:fill-onPrimary shrink-0"
        />
      </span>
      <p className="text-s mb-1.5 mt-[22px] text-center">
        {advertise.PaymentDetails.PixPayment.qrText}
      </p>
      <img className="mx-auto block" alt="QR Code" src={qrCode} />
    </div>
  )
}

export default PixPayment
