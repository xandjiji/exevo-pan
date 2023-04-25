import clsx from 'clsx'
import { useTranslations, templateString } from 'contexts/useTranslation'
import { useState } from 'react'
import { isEmptyCharacter } from 'shared-utils/dist/isEmptyCharacter'
import { Dialog, LabeledTextBox, Text, Skeleton, Shine } from 'components/Atoms'
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

          <div className="xs:mx-0 mx-auto min-w-[120px] shrink-0">
            <LabeledTextBox
              labelText={i18n.label}
              className="text-s bg-surface flex items-center gap-1"
              warning={failedEstimation}
            >
              {finishedLoading ? (
                estimatedAuction.data?.estimatedValue !== undefined &&
                !notPro ? (
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
                <Skeleton className="h-4 w-full animate-pulse">
                  <Shine animationIterationCount="infinite" width={60} />
                </Skeleton>
              )}
            </LabeledTextBox>

            <span
              className={clsx(
                'xs:-mb-2 mt-1 block w-full text-right text-xs',
                finishedLoading ? 'animate-fadeIn' : 'opacity-0',
              )}
              role={finishedLoading ? undefined : 'none'}
            >
              {templateString(
                estimatedAuction.data?.similarCount === 1
                  ? i18n.similarFound
                  : i18n.similarFoundPlural,
                {
                  count: estimatedAuction.data?.similarCount ?? 0,
                },
              )}
            </span>
          </div>
        </div>

        {notPro ? (
          <AuctionEstimationAlerts.ProOnly />
        ) : failedEstimation ? (
          <AuctionEstimationAlerts.Failed />
        ) : (
          <AuctionEstimationAlerts.Disclaimer />
        )}
      </div>
    </Dialog>
  )
}
