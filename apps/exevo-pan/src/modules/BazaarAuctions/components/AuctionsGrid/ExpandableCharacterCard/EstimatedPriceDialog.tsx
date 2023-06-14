import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { useState } from 'react'
import Link from 'next/link'
import { isEmptyCharacter } from 'shared-utils/dist/isEmptyCharacter'
import { Dialog } from 'components/Atoms'
import CharacterMiniCard from 'components/CharacterMiniCard'
import EstimatedPriceBox from 'components/EstimatedPriceBox'
import AuctionEstimationAlerts from 'components/AuctionEstimationAlerts'
import { getSimilarCharacterFilters, loadOutfitSrc } from 'utils'
import { trpc } from 'lib/trpc'
import { routes } from 'Constants'

type EstimatedPriceDialogProps = {
  onClose: () => void
  characterData: CharacterObject
}

export const EstimatedPriceDialog = ({
  onClose,
  characterData,
}: EstimatedPriceDialogProps) => {
  const { homepage } = useTranslations()
  const i18n = homepage.AuctionsGrid.EstimatedPriceDialog
  const emptyCharacter = isEmptyCharacter(characterData)

  const [estimationFilters] = useState(
    getSimilarCharacterFilters(characterData),
  )
  const estimatedAuction = trpc.estimateAuctionPrice.useQuery(
    { filterOptions: estimationFilters },
    { enabled: !emptyCharacter },
  )

  const failedEstimation =
    emptyCharacter || estimatedAuction.data?.similarCount === 0
  const notPro = estimatedAuction.data?.estimatedValue === -1
  const finishedLoading = failedEstimation || estimatedAuction.isFetched

  return (
    <Dialog
      isOpen
      onClose={onClose}
      heading={i18n.heading}
      className="xs:child:whitespace-nowrap xs:w-min"
    >
      <div className="flex flex-col gap-4 !whitespace-normal">
        <div className="xs:flex xs:items-center xs:justify-between xs:gap-4 grid gap-3">
          <CharacterMiniCard
            className="xs:max-w-min"
            outfitSrc={loadOutfitSrc(characterData.outfitId)}
            characterName={characterData.nickname}
            forceSubtitle=""
          />

          <EstimatedPriceBox
            className="xs:mx-0 mx-auto min-w-[120px] shrink-0"
            loading={!finishedLoading}
            similarCount={estimatedAuction.data?.similarCount}
            estimatedValue={estimatedAuction.data?.estimatedValue}
          />
        </div>

        {notPro ? (
          <AuctionEstimationAlerts.ProOnly />
        ) : failedEstimation ? (
          <AuctionEstimationAlerts.Failed />
        ) : (
          <AuctionEstimationAlerts.Disclaimer />
        )}

        <p className="text-tsm text-right">
          {templateMessage(i18n.goToCalculator, {
            calculatorPage: (
              <Link
                href={routes.AUCTION_ESTIMATION}
                className="text-primaryHighlight whitespace-nowrap font-bold leading-relaxed"
              >
                {i18n.calculatorPage}
              </Link>
            ),
          })}
        </p>
      </div>
    </Dialog>
  )
}
