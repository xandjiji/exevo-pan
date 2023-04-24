import { useState } from 'react'
import { Dialog } from 'components/Atoms'
import { getSimilarCharacterFilters } from 'utils'
import { trpc } from 'lib/trpc'
import { TRPCRouteInputs } from 'pages/api/trpc/[trpc]'

type EstimatedPriceDialogProps = {
  onClose: () => void
  characterData: CharacterObject
}

export const EstimatedPriceDialog = ({
  onClose,
  characterData,
}: EstimatedPriceDialogProps) => {
  const [estimationFilters, setEstimationFilters] =
    useState<TRPCRouteInputs['estimateAuctionPrice']['filterOptions']>()
  const estimateAuction = trpc.estimateAuctionPrice.useQuery({
    filterOptions: estimationFilters,
  })

  return (
    <Dialog isOpen onClose={onClose}>
      dsa
    </Dialog>
  )
}
