import { useState } from 'react'
import { Dialog, LabeledTextBox, Text } from 'components/Atoms'
import CharacterMiniCard from 'components/CharacterMiniCard'
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
  const [estimationFilters] = useState(
    getSimilarCharacterFilters(characterData),
  )
  const estimatedAuction = trpc.estimateAuctionPrice.useQuery({
    filterOptions: estimationFilters,
  })

  const failedEstimation = estimatedAuction.data?.similarCount === 0

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
          <LabeledTextBox
            labelText="Estmated price"
            className="text-s bg-surface flex items-center gap-1"
            warning={failedEstimation}
          >
            {estimatedAuction.data ? (
              estimatedAuction.data.estimatedValue ? (
                <Text.TibiaCoin
                  value={estimatedAuction.data.estimatedValue}
                  className="animate-fadeIn"
                />
              ) : (
                '???'
              )
            ) : (
              <div
                role="alert"
                className="loading-spinner mx-auto my-0.5 h-3 w-3"
              />
            )}
          </LabeledTextBox>
        </div>
      </div>
    </Dialog>
  )
}
