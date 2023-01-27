import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { usePushNotifications } from 'hooks'
import { Dialog } from 'components/Atoms'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import CharacterMiniCard from 'components/CharacterMiniCard'

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
        <div className="text-s grid w-full gap-4">
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
            <div>login redirect</div>
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
