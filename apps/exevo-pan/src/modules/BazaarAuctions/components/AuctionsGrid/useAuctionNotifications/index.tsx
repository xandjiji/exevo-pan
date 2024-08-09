import { createContext, useCallback, useContext, useState } from 'react'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import type { TRPCRouteInputs } from 'pages/api/trpc/[trpc]'
import NextLink from 'next/link'
import { usePushNotifications } from 'hooks'
import {
  Button,
  Checkbox,
  Dialog,
  ExevoProLink,
  Input,
  LoadingAlert,
} from 'components/Atoms'
import { Select } from 'components/Organisms'
import AuctionEnd from 'components/CharacterCard/Parts/Textbox/AuctionEnd'
import CharacterMiniCard from 'components/CharacterMiniCard'
import SetupNotifications from 'components/SetupNotifications'
import { loadOutfitSrc } from 'utils'
import { routes } from 'Constants'
import { isNotificationDateValid } from './utils'
import {
  AuctionConfigProps,
  AuctionNotificationsContextData,
  AuctionNotificationsProviderProps,
} from './types'

type RegisterAuctionNotificationInput =
  TRPCRouteInputs['registerAuctionNotification']

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
  const { common, homepage } = useTranslations()

  const { isSupported, permission } = usePushNotifications()
  const { data } = useSession()
  const isPro = !!data?.user.proStatus

  const [outfitId, setOutfitId] = useState('')
  const [permissionGranted, setPermissionGranted] = useState(false)

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
      toast.success(homepage.AuctionsGrid.useAuctionNotifications.success)
      closeNotificationsDialog()
    },
    onError: () => toast.error(common.genericError),
  })

  const disableTimeConfig = !formState.notifyAt
  const { isLoading } = register

  const invalidTime =
    formState.notifyAt &&
    !isNotificationDateValid({
      auctionEnd: formState.auctionEnd,
      timeMode: formState.timeMode,
      timeValue: formState.timeValue,
    })
  const noNotification = !formState.notifyAt && !formState.notifyOnBid
  const isInvalid = invalidTime || noNotification
  const isOpen = formState.auctionEnd > 0

  const enabledNotifications = permission === 'granted' || permissionGranted

  return (
    <NotificationsContext.Provider
      value={{ isSupported, openNotificationsDialog }}
    >
      {children}
      {isOpen ? (
        <Dialog
          isOpen
          onClose={closeNotificationsDialog}
          heading={homepage.AuctionsGrid.useAuctionNotifications.heading}
        >
          {isLoading && <LoadingAlert>{common.genericLoading}</LoadingAlert>}
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

            {enabledNotifications ? (
              <>
                <div className="grid gap-3">
                  <Checkbox
                    label={
                      <span>
                        {
                          homepage.AuctionsGrid.useAuctionNotifications
                            .bidNotification
                        }{' '}
                        {!isPro && (
                          <NextLink
                            href={routes.EXEVOPRO}
                            className="text-onSurface"
                            prefetch={false}
                          >
                            {templateMessage(
                              homepage.AuctionsGrid.useAuctionNotifications
                                .proExclusive,
                              {
                                exevopro: <ExevoProLink>🧞‍♀️</ExevoProLink>,
                              },
                            )}
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
                      label={
                        homepage.AuctionsGrid.useAuctionNotifications
                          .timeNotification
                      }
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
                      />
                      <Select
                        className="grow"
                        label=""
                        options={[
                          {
                            name: homepage.AuctionsGrid.useAuctionNotifications
                              .minutesLeft,
                            value: 'minutes',
                          },
                          {
                            name: homepage.AuctionsGrid.useAuctionNotifications
                              .hoursLeft,
                            value: 'hours',
                          },
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
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button pill hollow onClick={closeNotificationsDialog}>
                    {homepage.AuctionsGrid.useAuctionNotifications.cancelButton}
                  </Button>
                  <Button
                    pill
                    disabled={isInvalid || isLoading}
                    loading={isLoading}
                    onClick={() => register.mutate(formState)}
                  >
                    {
                      homepage.AuctionsGrid.useAuctionNotifications
                        .confirmButton
                    }
                  </Button>
                </div>
              </>
            ) : (
              <SetupNotifications
                onRegister={() => setPermissionGranted(true)}
              />
            )}
          </div>
        </Dialog>
      ) : null}
    </NotificationsContext.Provider>
  )
}

export const useAuctionNotifications = (): AuctionNotificationsContextData =>
  useContext(NotificationsContext)
