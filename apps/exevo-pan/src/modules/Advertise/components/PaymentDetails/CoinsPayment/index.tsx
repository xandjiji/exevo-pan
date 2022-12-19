import { useTranslations } from 'contexts/useTranslation'
import { Text, CopyButton } from 'components/Atoms'
import { advertising } from 'Constants'
import { useForm } from '../../../contexts/Form'
import { calculatePrice } from '../../../utils'
import { CoinsPaymentProps } from './types'

const Strong = (args: JSX.IntrinsicElements['strong']) => (
  <strong {...args} className="whitespace-nowrap" />
)

const CoinsPayment = ({ isPro }: CoinsPaymentProps) => {
  const {
    translations: { common, advertise },
  } = useTranslations()

  const { selectedDates, paymentCharacter } = useForm()

  return (
    <p className="text-s">
      {advertise.PaymentDetails.CoinsPayment.instruction}
      {' Tibia Coins '}
      {common.from}
      {': '}
      <div className="flex items-baseline justify-center gap-2">
        <Strong>{paymentCharacter.value}</Strong>{' '}
        <Text.Transfer
          amount={
            calculatePrice({
              days: selectedDates.length,
              paymentMethod: 'TIBIA_COINS',
              isPro,
            }).totalPrice
          }
          currency="tc"
        />
        <a
          href={`https://www.tibia.com/community/?name=${advertising.BANK_CHARACTER}`}
          target="_blank"
          rel="noreferrer noopener external"
          className="text-primaryHighlight font-bold tracking-wide"
        >
          {advertising.BANK_CHARACTER}
        </a>
        <CopyButton
          copyString={advertising.BANK_CHARACTER}
          className="relative top-1.5 ml-[1px] !inline-grid"
        />
      </div>
    </p>
  )
}

export default CoinsPayment
