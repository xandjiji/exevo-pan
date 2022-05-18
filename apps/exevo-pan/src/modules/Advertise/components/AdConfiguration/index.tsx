import RangeDatePicker from './RangeDatePicker'
import PaymentMethods from './PaymentMethods'
import Discount from './Discount'
import Summary from '../Summary'
import { useForm } from '../../contexts/Form'

const AdConfiguration = () => {
  const { selectedDates, paymentMethod } = useForm()

  const daysCount = selectedDates.length
  return (
    <section className="grid gap-6">
      <RangeDatePicker />
      <PaymentMethods />
      <Discount daysCount={daysCount} paymentMethod={paymentMethod} />
      <Summary />
    </section>
  )
}

export default AdConfiguration
