import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import {
  Dialog,
  Alert,
  LoadingAlert,
  Button,
  Switch,
  Checkbox,
} from 'components/Atoms'
import { usePushNotifications } from 'hooks'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import type { GuildMember } from '@prisma/client'
import { useBlacklist, bossNames } from './useBlacklist'

type SettingsDialogProps = {
  onClose: () => void
  currentMember: GuildMember
  onMemberUpdate: (updatedMember: GuildMember) => void
}

const AlertButton = ({
  className,
  ...props
}: JSX.IntrinsicElements['button']) => (
  <button
    type="button"
    className={clsx(
      className,
      'text-primaryHighlight cursor-pointer font-bold underline underline-offset-2',
    )}
    {...props}
  />
)

const SettingsDialog = ({
  onClose,
  currentMember,
  onMemberUpdate,
}: SettingsDialogProps) => {
  const {
    translations: { common, huntingGroups },
  } = useTranslations()
  const i18n = huntingGroups.SettingsDialog

  const {
    isSupported,
    permission,
    subscribeDevice,
    isLoading: loadingDeviceSubscription,
  } = usePushNotifications()

  const [allowSaveButton, setAllowSaveButton] = useState(false)
  const registerDevice = useCallback(
    () =>
      subscribeDevice()
        .then(() => {
          setAllowSaveButton(true)
          toast.success(i18n.registerSuccess)
        })
        .catch(() => toast.error(common.genericError)),
    [i18n, subscribeDevice],
  )

  const registeredDevice = permission === 'granted'

  const [disabledNotifications, setDisabledNotifications] = useState(
    currentMember.disabledNotifications,
  )
  const blacklist = useBlacklist(currentMember.blacklistedBosses)

  const updatePreferences = trpc.changeGuildMemberPreferences.useMutation({
    onSuccess: (updatedCurrentMember) => {
      onMemberUpdate(updatedCurrentMember)
      toast.success(i18n.successToast)
      onClose()
    },
    onError: () => toast.error(common.genericError),
  })

  const testMyNotification = trpc.testMyNotification.useMutation()

  const noChanges =
    blacklist.value.string === currentMember.blacklistedBosses &&
    disabledNotifications === currentMember.disabledNotifications

  return (
    <Dialog heading={i18n.heading} isOpen onClose={onClose}>
      {loadingDeviceSubscription && (
        <LoadingAlert>{common.LoadingLabel}</LoadingAlert>
      )}
      <div className="grid gap-6">
        {isSupported ? (
          <Alert variant={registeredDevice ? 'primary' : 'alert'} noIcon>
            {registeredDevice ? (
              <>
                <p>{i18n.registeredDevice}</p>
                <p className="mb-2">
                  {templateMessage(i18n.testNotification, {
                    button: (
                      <AlertButton
                        onClick={() =>
                          testMyNotification.mutate({
                            title: i18n.sampleNotification.title,
                            text: i18n.sampleNotification.text,
                          })
                        }
                      >
                        {i18n.test}
                      </AlertButton>
                    ),
                  })}
                </p>
                <p>
                  {templateMessage(i18n.retryRegistration, {
                    button: (
                      <AlertButton onClick={registerDevice}>
                        {i18n.retry}
                      </AlertButton>
                    ),
                  })}
                </p>
              </>
            ) : (
              templateMessage(i18n.enableNotifications, {
                button: (
                  <AlertButton onClick={registerDevice}>
                    {i18n.enableButton}
                  </AlertButton>
                ),
              })
            )}
          </Alert>
        ) : (
          <Alert variant="alert">{i18n.notSupported}</Alert>
        )}

        <Switch
          active={!disabledNotifications}
          onClick={() => setDisabledNotifications((prev) => !prev)}
          disabled={!registeredDevice}
        >
          {i18n.enableGroupNotifications}
        </Switch>

        <div className="grid gap-2">
          <h5 className="text-s">{i18n.receiveNotificationsFor}</h5>

          <div className="custom-scrollbar grid max-h-40 grid-cols-2 gap-x-4 gap-y-2 overflow-auto sm:grid-cols-3 md:max-h-60">
            {bossNames.map((boss) => (
              <Checkbox
                key={boss}
                label={boss}
                checked={!blacklist.value.set.has(boss)}
                onChange={() => blacklist.toggleValue(boss)}
                disabled={!registeredDevice}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-4">
        <Button hollow pill onClick={onClose}>
          {i18n.cancel}
        </Button>
        <Button
          pill
          onClick={() =>
            updatePreferences.mutate({
              guildMemberId: currentMember.id,
              disabledNotifications,
              blacklistedBosses: blacklist.value.string,
            })
          }
          loading={updatePreferences.isLoading}
          disabled={
            !allowSaveButton && (noChanges || updatePreferences.isLoading)
          }
        >
          {i18n.save}
        </Button>
      </div>
    </Dialog>
  )
}

export default SettingsDialog
