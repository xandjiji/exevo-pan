import { useState } from 'react'
import { Dialog } from 'components/Atoms'
import CharacterMiniCard from 'components/CharacterMiniCard'
import AuctionBid from 'components/CharacterCard/Parts/Textbox/AuctionBid'
import { getSimilarCharacterFilters, loadOutfitSrc } from 'utils'
import { trpc } from 'lib/trpc'

type EstimatedPriceDialogProps = {
  onClose: () => void
  characterData: CharacterObject
}

/* @ ToDo:
- value card
    - loading state
    - failed state
- disclaimer (abstracted component)
- link do calculator
- i18n
*/

export const EstimatedPriceDialog = ({
  onClose,
  characterData,
}: EstimatedPriceDialogProps) => {
  const [estimationFilters, setEstimationFilters] = useState(
    getSimilarCharacterFilters(characterData),
  )
  const estimatedAuction = trpc.estimateAuctionPrice.useQuery({
    filterOptions: estimationFilters,
  })

  return (
    <Dialog isOpen onClose={onClose} heading="Estimated auction price">
      <div className="xs:flex xs:items-center xs:justify-between xs:gap-4 grid gap-3">
        <CharacterMiniCard
          className="xs:max-w-min"
          outfitSrc={loadOutfitSrc(characterData.outfitId)}
          characterName={characterData.nickname}
          forceSubtitle=""
        />

        <div className="xs:mx-0 mx-auto min-w-[120px] shrink-0">
          <AuctionBid
            label="Estmated price"
            currentBid={estimatedAuction.data?.estimatedValue ?? '??'}
          />
        </div>
      </div>
    </Dialog>
  )
}
