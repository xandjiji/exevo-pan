import clsx from 'clsx'
import { useState, useMemo } from 'react'
import { Dialog, SpritePortrait, Input, Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { loadBossSrc } from 'utils'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'

/* @ ToDo: i18n */

type NotificationDialogProps = {
  guildId: string
  onClose: () => void
}

const bossNames = Object.values(bossTokens)

const NotificationDialog = ({ guildId, onClose }: NotificationDialogProps) => {
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

  /* const applyAction = trpc.applyToGuild.useMutation({
    onSuccess: () => {
      toast.success('Application sent!')
      onClose()
    },
    onError: () => {
      toast.error('You already joined this guild!')
      setAlreadyJoined(true)
    },
  }) */

  return (
    <Dialog
      heading="Notificate group"
      isOpen
      onClose={onClose}
      className="w-full max-w-sm !px-8 md:max-w-3xl"
    >
      <div className="grid h-full gap-4">
        <Input
          label="Search boss"
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
          {emptyBossList && <EmptyState text="No bosses" variant="medium" />}

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
                <SpritePortrait
                  src={loadBossSrc(boss)}
                  alt={boss}
                  offset
                  width={64}
                  height={64}
                  highlight={isSelected}
                  className="pointer-events-none group-focus:outline"
                  tabIndex={-1}
                />
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button hollow pill onClick={onClose}>
            Cancel
          </Button>
          <Button
            pill
            /* onClick={() => applyAction.mutate({ guildId, applyAs, message })}
            loading={applyAction.isLoading}
            */
            disabled={noBoss}
          >
            Send notification
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default NotificationDialog
