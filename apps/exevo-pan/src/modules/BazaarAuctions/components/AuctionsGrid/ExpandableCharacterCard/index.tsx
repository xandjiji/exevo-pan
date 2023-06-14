import clsx from 'clsx'
import { useRef, useMemo, useState, useCallback } from 'react'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { CopyButton } from 'components/Atoms'
import { Menu } from 'components/Organisms'
import CharacterCard from 'components/CharacterCard'
import CharacterModal from 'components/CharacterModal'
import {
  MoreIcon,
  ExpandIcon,
  SearchIcon,
  OutlineAddIcon,
  OutlineRemoveIcon,
  AlertIcon,
  WeightIcon,
  CalculatorIcon,
} from 'assets/svgs'
import { permalinkResolver, getSimilarCharacterFilters } from 'utils'
import { useSyncUrlState } from 'hooks'
import { urlParameters } from 'Constants'
import { useAuctions } from '../../../contexts/useAuctions'
import { useAuctionNotifications } from '../useAuctionNotifications'
import { EstimatedPriceDialog } from './EstimatedPriceDialog'
import { EstimatedSkillDialog } from './EstimatedSkillDialog'
import { ExpandableCharacterCardProps } from './types'

const ExpandableCharacterCard = ({
  highlightedAuctions,
  forceNoHighlight = false,
  characterData: characterDataProps,
  ...props
}: ExpandableCharacterCardProps) => {
  const { homepage } = useTranslations()
  const i18n = homepage.AuctionsGrid.ExpandableCharacterCard

  const auctionId = characterDataProps.id

  const highlightedAuction = useMemo(
    () => highlightedAuctions.find(({ id }) => id === auctionId),
    [auctionId, highlightedAuctions],
  )
  const characterData: CharacterObject = useMemo(
    () =>
      highlightedAuction
        ? { ...characterDataProps, tcInvested: highlightedAuction.tcInvested }
        : characterDataProps,
    [characterDataProps, highlightedAuction],
  )

  const { locale } = useRouter()

  const permalink = useMemo(
    () => permalinkResolver({ auctionId, locale }),
    [auctionId, locale],
  )

  const { Favorites, dispatch } = useAuctions()

  const [isExpanded, setExpanded] = useState(false)
  const [, setAuctionIdUrl] = useSyncUrlState<number | undefined>({
    key: urlParameters.AUCTION_ID,
    defaultValue: undefined,
  })

  const expandCard = useCallback(() => {
    if (permalink) setAuctionIdUrl(auctionId)
    setExpanded(true)
  }, [auctionId, permalink])

  const copyButtonRef = useRef<HTMLButtonElement>(null)

  const CopyButtonIcon = ({ className }: { className?: string }) => (
    <CopyButton
      ref={copyButtonRef}
      copyString={permalink}
      iconClassname={className}
    />
  )

  const copyLinkAction = useCallback(() => {
    copyButtonRef.current?.click()
  }, [])

  const isFavorited = Favorites.has(auctionId)
  const shouldAnimateFavIconRef = useRef(false)

  const FavoriteIcon = () => {
    const Icon = isFavorited ? OutlineRemoveIcon : OutlineAddIcon

    const shouldAnimate = shouldAnimateFavIconRef.current
    shouldAnimateFavIconRef.current = false

    return (
      <Icon
        className={clsx(
          'fill-primaryHighlight h-full w-full',
          shouldAnimate && 'animate-rollIn',
        )}
      />
    )
  }

  const auctionNotification = useAuctionNotifications()

  const [openEstimatePrice, setOpenEstimatePrice] = useState(false)
  const [openEstimateSkills, setOpenEstimateSkills] = useState(false)

  return (
    <>
      <CharacterCard
        cornerElement={
          <Menu
            items={[
              {
                label: i18n.details,
                icon: ExpandIcon,
                onSelect: expandCard,
              },
              {
                label: i18n.copyLink,
                icon: CopyButtonIcon,
                keepOpenAfterSelection: true,
                onSelect: copyLinkAction,
              },
              {
                label: i18n.favorite[isFavorited ? 'remove' : 'add'],
                icon: FavoriteIcon,
                keepOpenAfterSelection: true,
                onSelect: () => {
                  Favorites.toggle(auctionId)
                  shouldAnimateFavIconRef.current = true
                },
              },
              {
                label: i18n.notify,
                icon: AlertIcon,
                onSelect: () =>
                  auctionNotification.openNotificationsDialog({
                    auctionId: characterData.id,
                    auctionEnd: characterData.auctionEnd,
                    nickname: characterData.nickname,
                    outfitId: characterData.outfitId,
                  }),
                disabled: !auctionNotification.isSupported || props.past,
              },
              {
                label: i18n.findSimilar,
                icon: SearchIcon,
                onSelect: () =>
                  dispatch({
                    type: 'SET_SIMILAR_FILTERS',
                    filterOptions: getSimilarCharacterFilters(characterData),
                  }),
              },
              {
                label: i18n.estimateSkills,
                icon: WeightIcon,
                onSelect: () => setOpenEstimateSkills(true),
                disabled:
                  characterData.vocationId === vocation.VOCATION_IDS.NONE,
              },
              {
                label: i18n.estimatePrice,
                icon: CalculatorIcon,
                onSelect: () => setOpenEstimatePrice(true),
              },
            ]}
          >
            <MoreIcon className="fill-onSurface" />
          </Menu>
        }
        {...props}
        lazyRender
        highlighted={forceNoHighlight ? false : !!highlightedAuction}
        characterData={characterData}
      />

      {isExpanded && (
        <CharacterModal
          characterData={characterData}
          onClose={() => {
            if (permalink) setAuctionIdUrl(undefined)
            setExpanded(false)
          }}
        />
      )}

      {openEstimateSkills && (
        <EstimatedSkillDialog
          onClose={() => setOpenEstimateSkills(false)}
          vocationId={characterData.vocationId}
          skills={characterData.skills}
        />
      )}

      {openEstimatePrice && (
        <EstimatedPriceDialog
          onClose={() => setOpenEstimatePrice(false)}
          characterData={characterData}
        />
      )}
    </>
  )
}

export default ExpandableCharacterCard
