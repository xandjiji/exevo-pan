import RangeDatePicker from './RangeDatePicker'
import PaymentMethods from './PaymentMethods'
import Discount from './Discount'
import Summary from '../Summary'
import { useForm } from '../../contexts/Form'

type AdConfigurationProps = {
  isPro: boolean
}

const AdConfiguration = ({ isPro }: AdConfigurationProps) => {
  const { selectedDates, paymentMethod } = useForm()

  const daysCount = selectedDates.length
  return (
    <section className="grid gap-6">
      <RangeDatePicker />
      <PaymentMethods />
      <Discount
        daysCount={daysCount}
        paymentMethod={paymentMethod}
        isPro={isPro}
      />
      <Summary isPro={isPro} />
    </section>
  )
}

export default AdConfiguration
