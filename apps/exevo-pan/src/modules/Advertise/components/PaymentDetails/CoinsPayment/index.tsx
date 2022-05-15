import { useTranslations } from 'contexts/useTranslation'
import { CopyButton } from 'components/Atoms'
import { advertising } from 'Constants'
import { useForm } from '../../../contexts/Form'
import { calculatePrice, readablePrice } from '../../../utils'

const Strong = (args: JSX.IntrinsicElements['strong']) => (
  <strong {...args} className="whitespace-nowrap" />
)

const CoinsPayment = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { selectedDates, paymentCharacter } = useForm()

  return (
    <p className="text-s">
      {advertise.PaymentDetails.CoinsPayment.instruction}{' '}
      <Strong>
        {readablePrice.full.TIBIA_COINS(
          calculatePrice(selectedDates.length, 'TIBIA_COINS').totalPrice,
        )}
      </Strong>{' '}
      {advertise.PaymentDetails.CoinsPayment.from}{' '}
      <Strong>{paymentCharacter.value}</Strong>{' '}
      {advertise.PaymentDetails.CoinsPayment.to}{' '}
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
    </p>
  )
}

export default CoinsPayment
