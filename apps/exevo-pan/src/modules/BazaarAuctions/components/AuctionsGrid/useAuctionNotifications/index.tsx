import { createContext, useContext, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import type { RegisterAuctionNotificationInput } from 'server/registerAuctionNotification'
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
import { loadOutfitSrc } from 'utils'
import { routes } from 'Constants'
import { isNotificationDateValid } from './utils'
import {
  AuctionNotificationsContextData,
  AuctionNotificationsProviderProps,
  AuctionConfigProps,
} from './types'

/* @ ToDo:

- i18n

*/

const DEFAULT_STATE: AuctionNotificationsContextData = {
  isSupported: false,
  openNotificationsDialog: () => {},
}

const NotificationsContext =
  createContext<AuctionNotificationsContextData>(DEFAULT_STATE)

const INITIAL_FORM_VALUES: RegisterAuctionNotificationInput = {
  auctionId: -1,
  auctionEnd: 0,
  nickname: '',
  notifyOnBid: false,
  notifyAt: true,
  timeMode: 'minutes',
  timeValue: 15,
}

export const AuctionNotificationsProvider = ({
  children,
}: AuctionNotificationsProviderProps) => {
  const {
    isSupported,
    permission,
    subscribeDevice,
    isLoading: loadingDeviceSubscription,
  } = usePushNotifications()
  const { data } = useSession()
  const isAuthed = !!data
  const isPro = !!data?.user.proStatus

  const [outfitId, setOutfitId] = useState('')

  const [formState, setFormState] =
    useState<RegisterAuctionNotificationInput>(INITIAL_FORM_VALUES)

  const closeNotificationsDialog = useCallback(
    () =>
      setFormState((prev) => ({
        ...prev,
        auctionId: -1,
        auctionEnd: 0,
        nickname: '',
      })),
    [],
  )

  const openNotificationsDialog = useCallback((config: AuctionConfigProps) => {
    setFormState({ ...INITIAL_FORM_VALUES, ...config })
    setOutfitId(config.outfitId)
  }, [])

  const register = trpc.registerAuctionNotification.useMutation({
    onSuccess: () => {
      toast.success('Notification was set!')
      closeNotificationsDialog()
    },
    onError: () => toast.error('Oops! Something went wrong'),
  })

  const disableTimeConfig = !formState.notifyAt
  const isLoading = loadingDeviceSubscription || register.isLoading

  const invalidTime =
    formState.notifyAt &&
    !isNotificationDateValid({
      auctionEnd: formState.auctionEnd,
      timeMode: formState.timeMode,
      timeValue: formState.timeValue,
    })
  const noNotification = !formState.notifyAt && !formState.notifyOnBid
  const isInvalid = invalidTime || noNotification

  return (
    <NotificationsContext.Provider
      value={{ isSupported, openNotificationsDialog }}
    >
      {children}
      {formState.auctionEnd > 0 ? (
        /* @ ToDo: i18n */
        <Dialog
          isOpen
          onClose={closeNotificationsDialog}
          heading="Set auction notification"
        >
          {/* @ ToDo: i18n */}
          {loadingDeviceSubscription && <LoadingAlert>Loading...</LoadingAlert>}
          <div className="text-s grid gap-6">
            <div className="xs:flex xs:items-center xs:justify-between xs:gap-4 grid gap-[18px]">
              <CharacterMiniCard
                className="xs:max-w-min"
                outfitSrc={loadOutfitSrc(outfitId)}
                characterName={formState.nickname}
                forceSubtitle=""
              />
              <div className="xs:mx-0 mx-auto w-fit shrink-0">
                <AuctionEnd auctionEnd={formState.auctionEnd} />
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
                  <Checkbox
                    label={
                      <span>
                        Notify me when bidded{' '}
                        {!isPro && (
                          <NextLink
                            href={routes.EXEVOPRO}
                            className="text-onSurface"
                          >
                            (exclusive for{' '}
                            <strong className="text-rare">Exevo Pro 🧞‍♀️</strong>)
                          </NextLink>
                        )}
                      </span>
                    }
                    disabled={!isPro}
                    checked={formState.notifyOnBid}
                    onChange={() =>
                      setFormState((prev) => ({
                        ...prev,
                        notifyOnBid: !prev.notifyOnBid,
                      }))
                    }
                  />

                  <div>
                    <Checkbox
                      label="Notify me before auction end:"
                      checked={formState.notifyAt}
                      onChange={() =>
                        setFormState((prev) => ({
                          ...prev,
                          notifyAt: !prev.notifyAt,
                        }))
                      }
                    />
                    <div className="child:shrink-0 flex w-full gap-2">
                      <Input
                        label=""
                        type="number"
                        step={formState.timeMode === 'minutes' ? 15 : 1}
                        min={0}
                        max={formState.timeMode === 'minutes' ? 60 : 24}
                        value={formState.timeValue}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            timeValue: Math.round(+e.target.value),
                          }))
                        }
                        disabled={disableTimeConfig}
                        error={invalidTime}
                        noAlert
                      />
                      <Select
                        className="grow"
                        label=""
                        options={[
                          { name: 'Minutes left', value: 'minutes' },
                          { name: 'Hours left', value: 'hours' },
                        ]}
                        value={formState.timeMode}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            timeMode: e.target
                              .value as RegisterAuctionNotificationInput['timeMode'],
                          }))
                        }
                        disabled={disableTimeConfig}
                        error={invalidTime}
                        noAlert
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button pill hollow onClick={closeNotificationsDialog}>
                    Cancel
                  </Button>
                  <Button
                    pill
                    disabled={isInvalid || isLoading}
                    loading={isLoading}
                    onClick={() => register.mutate(formState)}
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </div>
        </Dialog>
      ) : null}
    </NotificationsContext.Provider>
  )
}

export const useAuctionNotifications = (): AuctionNotificationsContextData =>
  useContext(NotificationsContext)
