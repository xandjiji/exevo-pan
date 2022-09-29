import { useMemo } from 'react'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { Dialog, SpritePortrait } from 'components/Atoms'
import { loadBossSrc, loadLootSrc } from 'utils'
import { bossInfo } from '../../bossInfo'
import { BossDialogProps } from './types'

const BossDialog = ({ bossName, onClose }: BossDialogProps) => {
  const info = useMemo(
    () => bossInfo.get(bossName as TrackedBossName),
    [bossName],
  )

  return (
    <Dialog isOpen={!!info} onClose={onClose}>
      <div className="mb-4 mr-4 flex items-center gap-1.5">
        <SpritePortrait
          src={loadBossSrc(bossName ?? '')}
          alt={bossName}
          offset
          width={64}
          height={64}
        />
        <h3 className="text-l">{bossName}</h3>
      </div>

      <div className="custom-scrollbar -mr-4 grid max-h-[60vh] gap-6 overflow-auto pt-4 pr-4 sm:w-[70vw] sm:max-w-[606px]">
        {!!info?.loot && (
          <section className="grid gap-2">
            <h3 className="text-base">Relevant loot</h3>

            <div className="flex flex-wrap gap-1.5">
              {info.loot.map((item) => (
                <SpritePortrait
                  src={loadLootSrc(item)}
                  alt={item}
                  title={item}
                  width={32}
                  height={32}
                />
              ))}
            </div>
          </section>
        )}

        {!!info?.locations && (
          <section className="grid gap-2">
            <h3 className="text-base">Locations</h3>

            <ul className="grid gap-4">
              {info.locations.map(({ src, description }) => (
                <li key={src} className="grid gap-2">
                  <iframe
                    src={src}
                    title={description}
                    className="h-80 w-full border-0 shadow"
                  />
                  {!!description && <caption>{description}</caption>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Dialog>
  )
}

export default BossDialog
