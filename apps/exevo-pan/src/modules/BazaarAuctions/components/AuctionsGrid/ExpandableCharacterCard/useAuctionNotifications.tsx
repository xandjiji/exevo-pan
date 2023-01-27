import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { usePushNotifications } from 'hooks'
import { Dialog, Alert, Button } from 'components/Atoms'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import CharacterMiniCard from 'components/CharacterMiniCard'
import { routes } from 'Constants'

/* @ ToDo:

- not authed state
- enable notifications state
- time option
- bid option
- close/success state (Snackbar?)
*/

export const useAuctionNotifications = ({
  id,
  outfitId,
  nickname,
  level,
  serverData: { serverName },
  auctionEnd,
  vocationId,
}: CharacterObject) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [])

  const { isSupported, permission } = usePushNotifications()
  const { data } = useSession()
  const isAuthed = !!data

  return {
    isSupported,
    toggleOpen,
    DialogElement: isOpen ? (
      /* @ ToDo: i18n */
      <Dialog isOpen onClose={toggleOpen} heading="Set auction notification">
        <div className="text-s grid gap-4">
          <CharacterMiniCard
            outfitSrc={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
            characterData={{
              name: nickname,
              level,
              vocation: vocation.getPromotedName({ vocationId, level }),
              world: serverName,
            }}
          />
          {!isAuthed ? (
            <Alert variant="alert">
              {/* @ ToDo: i18n */}
              You must{' '}
              <NextLink
                href={routes.LOGIN}
                className="text-onAlert font-bold underline underline-offset-2"
              >
                log in
              </NextLink>{' '}
              to set up auction notifications!
            </Alert>
          ) : permission !== 'granted' ? (
            <div>enable notifications</div>
          ) : (
            <div>options</div>
          )}
        </div>
      </Dialog>
    ) : null,
  }
}
