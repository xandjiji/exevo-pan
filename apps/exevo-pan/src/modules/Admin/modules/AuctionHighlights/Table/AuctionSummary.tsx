import clsx from 'clsx'
import { AuctionLink } from 'components/Atoms'

type AuctionSummaryProps = {
  auctionId: number
  lastUpdated: Date
  nickname: string
} & JSX.IntrinsicElements['div']

const AuctionSummary = ({
  auctionId,
  nickname,
  lastUpdated,
  className,
  ...props
}: AuctionSummaryProps) => (
  <div className={clsx(className, 'text-s grid gap-1.5')} {...props}>
    <AuctionLink auctionId={auctionId} className="text-primaryHighlight">
      {nickname}
    </AuctionLink>
    <p>
      {lastUpdated.toLocaleString('pt-BR', {
        hour12: false,
      })}
    </p>
  </div>
)

export default AuctionSummary
