import { useTranslations } from 'contexts/useTranslation'
import { RangeDatePicker } from 'components/Organisms'
import { dateToStandardStringDate } from 'utils'
import PaymentMethods from './PaymentMethods'
import Discount from './Discount'
import Summary from '../Summary'
import { useForm } from '../../contexts/Form'

const AdConfiguration = () => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { selectedCharacter, selectedDates, paymentMethod, isPro, dispatch } =
    useForm()

  const daysCount = selectedDates.length
  return (
    <section className="grid gap-6">
      <RangeDatePicker
        endDate={new Date((selectedCharacter?.auctionEnd ?? 0) * 1000)}
        selectedDates={selectedDates.map((date) => new Date(date))}
        onDateSelect={(selectedDate) =>
          dispatch({
            type: 'TOGGLE_DATE',
            date: dateToStandardStringDate(selectedDate),
          })
        }
      />
      <p className="-mt-3 text-xs tracking-wide">
        {advertise.calendarDescription}
      </p>
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
