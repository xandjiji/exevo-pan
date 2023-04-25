import clsx from 'clsx'
import {
  useTranslations,
  templateMessage,
  templateString,
} from 'contexts/useTranslation'
import { useState } from 'react'
import { Dialog, LabeledTextBox, Text } from 'components/Atoms'
import CharacterMiniCard from 'components/CharacterMiniCard'
import AuctionEstimationAlerts from 'components/AuctionEstimationAlerts'
import { getSimilarCharacterFilters, loadOutfitSrc } from 'utils'
import { trpc } from 'lib/trpc'

type EstimatedPriceDialogProps = {
  onClose: () => void
  characterData: CharacterObject
}

/* @ ToDo:
- link do calculator
*/

export const EstimatedPriceDialog = ({
  onClose,
  characterData,
}: EstimatedPriceDialogProps) => {
  const {
    translations: { homepage },
  } = useTranslations()
  const i18n = homepage.AuctionsGrid.EstimatedPriceDialog

  const [estimationFilters] = useState(
    getSimilarCharacterFilters(characterData),
  )
  const estimatedAuction = trpc.estimateAuctionPrice.useQuery({
    filterOptions: estimationFilters,
  })

  const failedEstimation = estimatedAuction.data?.similarCount === 0
  const notPro = estimatedAuction.data?.estimatedValue === -1

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

          <div className="xs:mx-0 mx-auto min-w-[120px] shrink-0">
            <LabeledTextBox
              labelText={i18n.label}
              className="text-s bg-surface flex items-center gap-1"
              warning={failedEstimation}
              title={templateString(i18n.similarFound, {
                count: estimatedAuction.data?.similarCount ?? 0,
              })}
            >
              {estimatedAuction.data ? (
                estimatedAuction.data.estimatedValue && !notPro ? (
                  <Text.TibiaCoin
                    value={estimatedAuction.data.estimatedValue}
                    className="animate-fadeIn"
                  />
                ) : (
                  <span
                    className={clsx(
                      'mx-auto tracking-wider',
                      notPro && 'text-rare font-bold',
                    )}
                  >
                    ?????
                  </span>
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

        {notPro && <AuctionEstimationAlerts.ProOnly />}

        {failedEstimation && <AuctionEstimationAlerts.Failed />}

        <AuctionEstimationAlerts.Disclaimer />
      </div>
    </Dialog>
  )
}