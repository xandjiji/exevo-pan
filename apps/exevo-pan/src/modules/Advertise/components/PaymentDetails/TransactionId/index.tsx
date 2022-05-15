import { useTranslations } from 'contexts/useTranslation'

const TransactionId = ({ children }: { children: React.ReactNode }) => {
  const {
    translations: { advertise },
  } = useTranslations()

  return (
    <div>
      <p className="text-tsm mb-1 tracking-wide">
        {advertise.PaymentDetails.TransactionIdLabel}
      </p>
      <span className="code text-center">{children}</span>
    </div>
  )
}

export default TransactionId
