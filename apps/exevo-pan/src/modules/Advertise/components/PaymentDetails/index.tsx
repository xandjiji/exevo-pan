import { useTranslations } from 'contexts/useTranslation'
import { CheckIcon } from 'assets/svgs'
import { useForm } from '../../contexts/Form'
import TransactionId from './TransactionId'
import CoinsPayment from './CoinsPayment'
import PixPayment from './PixPayment'
import Summary from '../Summary'

const PaymentDetails = () => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { isPro, uuid, email, paymentMethod } = useForm()

  return (
    <div className="grid gap-6">
      <section className="card grid gap-6 p-4">
        <h2
          className="border-separator -mb-1 flex items-center border-solid pb-1 text-2xl"
          style={{ borderWidth: 0, borderBottomWidth: 1 }}
        >
          <CheckIcon
            aria-label={advertise.PaymentDetails.titleIconLabel}
            className="fill-primary mr-1.5"
          />
          {advertise.PaymentDetails.title}
        </h2>
        <TransactionId>{uuid}</TransactionId>

        <p className="text-s leading-relaxed">
          {advertise.PaymentDetails.emailText1}{' '}
          <strong className="text-primaryHighlight tracking-wider">
            {email.value}
          </strong>{' '}
          {advertise.PaymentDetails.emailText2}{' '}
          <span role="img" aria-label={advertise.PaymentDetails.emojiLabel}>
            😄
          </span>
        </p>

        {paymentMethod === 'TIBIA_COINS' ? (
          <CoinsPayment isPro={isPro} />
        ) : (
          <PixPayment isPro={isPro} />
        )}

        <span className="text-xs tracking-wide">
          {advertise.PaymentDetails.smallDisclaimer}
        </span>
      </section>
      <Summary />
    </div>
  )
}

export default PaymentDetails
