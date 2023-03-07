import clsx from 'clsx'
import { useState, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Dialog, SpritePortrait, Input, Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { loadBossSrc } from 'utils'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'

type NotificationDialogProps = {
  guildId: string
  onClose: () => void
}

const bossNames = Object.values(bossTokens)

const NotificationDialog = ({ guildId, onClose }: NotificationDialogProps) => {
  const {
    translations: { common, huntingGroups },
  } = useTranslations()
  const i18n = huntingGroups.NotificationDialog

  const [bossQuery, setBossQuery] = useState('')
  const [selectedBoss, setSelectedBoss] = useState('')

  const bossList = useMemo(
    () =>
      bossNames.filter((boss) => boss.toLocaleLowerCase().includes(bossQuery)),
    [bossQuery],
  )

  const queryMatch = bossList.length === 1
  const emptyBossList = bossList.length === 0
  const noBoss = selectedBoss.length === 0

  const notify = trpc.notifyGuildMembers.useMutation({
    onSuccess: () => {
      toast.success(i18n.successToast)
      onClose()
    },
    onError: () => toast.error(common.genericError),
  })

  return (
    <Dialog
      heading={i18n.heading}
      isOpen
      onClose={onClose}
      className="w-full max-w-sm !px-8 md:max-w-3xl"
    >
      <div className="grid h-full gap-4">
        <Input
          label={i18n.search}
          allowClear
          value={bossQuery}
          onChange={(e) => setBossQuery(e.target.value.toLowerCase())}
          placeholder="e.g. 'Yeti', 'Mr. Punish'"
          onKeyPress={(e) => {
            if (e.code === 'Enter' && queryMatch) {
              const [matchedBoss] = bossList
              setSelectedBoss(matchedBoss)
            }
          }}
        />
        <div
          className={clsx(
            'custom-scrollbar -ml-4 grid h-80 gap-3 overflow-auto md:-mt-2',
            emptyBossList
              ? 'place-items-center'
              : 'grid-cols-[repeat(auto-fill,56px)] grid-rows-[repeat(auto-fill,56px)] justify-between pr-2 pb-1.5 pl-4 md:pt-4',
          )}
        >
          {emptyBossList && (
            <EmptyState text={i18n.emptyState} variant="medium" />
          )}

          {bossList.map((boss) => {
            const isSelected = selectedBoss === boss

            return (
              <button
                type="button"
                key={boss}
                title={boss}
                role="switch"
                aria-checked={isSelected}
                onClick={() => setSelectedBoss(isSelected ? '' : boss)}
                className="clickable group rounded-md outline-none"
              >
                <div className="rounded-lg group-focus:outline">
                  <SpritePortrait
                    src={loadBossSrc(boss)}
                    alt={boss}
                    offset
                    width={64}
                    height={64}
                    highlight={isSelected}
                    className="pointer-events-none"
                    tabIndex={-1}
                  />
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button hollow pill onClick={onClose}>
            {i18n.cancel}
          </Button>
          <Button
            pill
            onClick={() => notify.mutate({ guildId, boss: selectedBoss })}
            loading={notify.isLoading}
            disabled={noBoss || notify.isLoading}
          >
            {i18n.send}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default NotificationDialog
