import { getDaysUntilAuctionEnd } from './utils'
import { RangeDatePickerProps } from './types'

const RangeDatePicker = ({
  auctionEnd,
  ...props
}: RangeDatePickerProps): JSX.Element => {
  console.log(getDaysUntilAuctionEnd(auctionEnd))
  return (
    <div>
      {getDaysUntilAuctionEnd(auctionEnd).map((dateString) => (
        <p>{dateString}</p>
      ))}
    </div>
  )
}

export default RangeDatePicker
