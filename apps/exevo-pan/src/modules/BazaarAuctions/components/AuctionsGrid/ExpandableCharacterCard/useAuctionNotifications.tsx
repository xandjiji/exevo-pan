import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { usePushNotifications } from 'hooks'
import {
  Dialog,
  Alert,
  LoadingAlert,
  Input,
  Checkbox,
  Button,
} from 'components/Atoms'
import { Select } from 'components/Organisms'
import AuctionEnd from 'components/CharacterCard/Parts/Textbox/AuctionEnd'
import CharacterMiniCard from 'components/CharacterMiniCard'
import { routes } from 'Constants'

/* @ ToDo:

- config
    manage state (disables, values, step, max/min, pro, error)
- loading/close/success state (Snackbar?)
- test notifications?
- disable on history/fav
- i18n

*/

export const useAuctionNotifications = ({
  id,
  outfitId,
  nickname,
  auctionEnd,
}: CharacterObject) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [])

  const {
    isSupported,
    permission,
    subscribeDevice,
    isLoading: loadingDeviceSubscription,
  } = usePushNotifications()
  const { data } = useSession()
  const isAuthed = !!data

  const isLoading = loadingDeviceSubscription

  return {
    isSupported,
    toggleOpen,
    DialogElement: isOpen ? (
      /* @ ToDo: i18n */
      <Dialog isOpen onClose={toggleOpen} heading="Set auction notification">
        {/* @ ToDo: i18n */}
        {isLoading && <LoadingAlert>Loading...</LoadingAlert>}
        <div className="text-s grid gap-6">
          <div className="xs:flex xs:items-center xs:justify-between xs:gap-4 grid gap-[18px]">
            <CharacterMiniCard
              className="xs:max-w-min"
              outfitSrc={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
              characterName={nickname}
              forceSubtitle=""
            />
            <div className="xs:mx-0 mx-auto w-fit shrink-0">
              <AuctionEnd auctionEnd={auctionEnd} />
            </div>
          </div>
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
              to set up auction notifications
            </Alert>
          ) : permission !== 'granted' ? (
            <Alert variant="primary">
              {/* @ ToDo: i18n */}
              Please{' '}
              <button
                type="button"
                className="text-primaryHighlight cursor-pointer font-bold underline underline-offset-2"
                onClick={subscribeDevice}
              >
                enable notifications
              </button>{' '}
              on this device
            </Alert>
          ) : (
            <>
              <div className="grid gap-3">
                <Checkbox label="Notify me when bidded" />

                <div>
                  <Checkbox label="Notify me before auction end:" />
                  <div className="child:shrink-0 flex w-full gap-2">
                    <Input
                      label=""
                      type="number"
                      defaultValue="15"
                      step={15}
                      min={0}
                      max={60}
                      disabled
                      noAlert
                    />
                    <Select
                      className="grow"
                      label=""
                      defaultValue="minutes"
                      options={[
                        { name: 'Minutes left', value: 'minutes' },
                        { name: 'Hours left', value: 'hours' },
                      ]}
                      disabled
                      noAlert
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button pill hollow>
                  Cancel
                </Button>
                <Button pill>Confirm</Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    ) : null,
  }
}
