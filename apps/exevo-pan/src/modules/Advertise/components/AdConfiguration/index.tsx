import RangeDatePicker from './RangeDatePicker'
import PaymentMethods from './PaymentMethods'
import Discount from './Discount'
import Summary from '../Summary'
import { useForm } from '../../contexts/Form'

const AdConfiguration = () => {
  const { selectedCharacter, selectedDates, paymentMethod, isPro } = useForm()

  const daysCount = selectedDates.length
  return (
    <section className="grid gap-6">
      <RangeDatePicker />
      <PaymentMethods />
      <Discount
        isPro={isPro}
        daysCount={daysCount}
        paymentMethod={paymentMethod}
      />
      <Summary
        isPro={isPro}
        selectedCharacter={selectedCharacter}
        selectedDates={selectedDates}
        paymentMethod={paymentMethod}
      />
    </section>
  )
}

export default AdConfiguration
