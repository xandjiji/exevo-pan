import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Alert, AuctionLink } from 'components/Atoms'

type NotFoundAlertProps = {
  notFoundIds: number[]
}

const NotFoundAlert = ({ notFoundIds }: NotFoundAlertProps) => {
  const { common, homepage } = useTranslations()

  if (notFoundIds.length === 0) return null

  return (
    <Alert variant="alert" className="w-fit">
      {homepage.AuctionsGrid.NotFoundAlert}{' '}
      {notFoundIds.map((id, index) => (
        <>
          <AuctionLink
            auctionId={id}
            className="text-onAlert font-bold underline underline-offset-2"
          >
            <span className="font-thin">#</span>
            {id}
          </AuctionLink>
          {index < notFoundIds.length - 2
            ? ', '
            : index === notFoundIds.length - 1
            ? '.'
            : ` ${common.and} `}
        </>
      ))}
    </Alert>
  )
}

export default memo(NotFoundAlert)
