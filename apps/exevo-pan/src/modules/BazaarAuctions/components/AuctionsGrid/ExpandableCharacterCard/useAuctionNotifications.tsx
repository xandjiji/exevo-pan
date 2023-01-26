import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { usePushNotifications } from 'hooks'
import { Dialog } from 'components/Atoms'

/* @ ToDo:

- unsupported
- not authed state
- enable notifications state
- time option
- bid option
- close/success state (Snackbar?)
*/

export const useAuctionNotifications = ({
  id,
  nickname,
  auctionEnd,
}: CharacterObject) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [])

  const { isSupported, permission } = usePushNotifications()
  const { data } = useSession()
  const isAuthed = !!data

  return {
    toggleOpen,
    DialogElement: isOpen ? (
      <Dialog isOpen onClose={toggleOpen}>
        {!isSupported ? (
          <div>not suported</div>
        ) : !isAuthed ? (
          <div>login redirect</div>
        ) : permission !== 'granted' ? (
          <div>enable notifications</div>
        ) : (
          <div>options</div>
        )}
      </Dialog>
    ) : null,
  }
}
