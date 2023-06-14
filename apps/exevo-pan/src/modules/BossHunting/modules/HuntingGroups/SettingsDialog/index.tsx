import { useState } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Dialog, Button, Switch, Checkbox } from 'components/Atoms'
import SetupNotifications from 'components/SetupNotifications'
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

const SettingsDialog = ({
  onClose,
  currentMember,
  onMemberUpdate,
}: SettingsDialogProps) => {
  const { common, huntingGroups } = useTranslations()
  const i18n = huntingGroups.SettingsDialog

  const { permission } = usePushNotifications()
  const [justRegistered, setJustRegistered] = useState(false)
  const registeredDevice = permission === 'granted' || justRegistered

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

  const noChanges =
    blacklist.value.string === currentMember.blacklistedBosses &&
    disabledNotifications === currentMember.disabledNotifications

  return (
    <Dialog heading={i18n.heading} isOpen onClose={onClose}>
      <div className="grid gap-6">
        <SetupNotifications onRegister={() => setJustRegistered(true)} />

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
            !justRegistered && (noChanges || updatePreferences.isLoading)
          }
        >
          {i18n.save}
        </Button>
      </div>
    </Dialog>
  )
}

export default SettingsDialog
