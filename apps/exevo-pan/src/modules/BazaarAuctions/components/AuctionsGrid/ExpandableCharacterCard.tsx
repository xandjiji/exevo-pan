/* eslint-disable react/require-default-props */
import { useRef, useMemo, useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { CopyButton, Sticker } from 'components/Atoms'
import { Menu, ClientComponent } from 'components/Organisms'
import CharacterCard from 'components/CharacterCard'
import CharacterModal from 'components/CharacterModal'
import { MoreIcon, ExpandIcon, SearchIcon } from 'assets/svgs'
import { CharacterCardProps } from 'components/CharacterCard/types'
import { permalinkResolver } from 'utils'
import { useSyncUrlState } from 'hooks'
import { urlParameters } from 'Constants'
import { useAuctions } from '../../contexts/useAuctions'
import { getSimilarCharacterFilters } from './utils'

const ExpandableCharacterCard = (props: Omit<CharacterCardProps, 'ref'>) => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { characterData } = props
  const auctionId = characterData.id

  const { locale } = useRouter()

  const permalink = useMemo(
    () => permalinkResolver({ auctionId, locale }),
    [auctionId, locale],
  )

  const { dispatch } = useAuctions()

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

  return (
    <>
      <CharacterCard
        cornerElement={
          <Menu
            items={[
              {
                label: homepage.AuctionsGrid.ExpandableCharacterCard.details,
                icon: ExpandIcon,
                onSelect: expandCard,
              },
              {
                label: homepage.AuctionsGrid.ExpandableCharacterCard.copyLink,
                icon: CopyButtonIcon,
                keepOpenAfterSelection: true,
                onSelect: copyLinkAction,
              },
              {
                label:
                  homepage.AuctionsGrid.ExpandableCharacterCard.findSimilar,
                icon: SearchIcon,
                onSelect: () =>
                  dispatch({
                    type: 'SET_SIMILAR_FILTERS',
                    filterOptions: getSimilarCharacterFilters(characterData),
                  }),
              },
            ]}
          >
            <MoreIcon className="fill-onSurface" />
            {/* @ ToDo: remove this */}
            <ClientComponent>
              <Sticker
                localStorageKey="05012023"
                className="animate-swing absolute -top-4 left-4"
                style={{ rotate: '30deg' }}
              >
                New
              </Sticker>
            </ClientComponent>
          </Menu>
        }
        {...props}
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
    </>
  )
}

export default ExpandableCharacterCard
