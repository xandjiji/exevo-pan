import { useMemo } from 'react'
import { templateString, useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { bossStatistics } from 'data-dictionary/dist/dictionaries/bossStatistics'
import { Dialog, SpritePortrait } from 'components/Atoms'
import { loadBossSrc, loadLootSrc } from 'utils'
import { links } from 'Constants'
import { bossInfo } from '../../bossInfo'
import { BossDialogProps } from './types'

const Section = ({ className, ...props }: JSX.IntrinsicElements['section']) => (
  <section
    className={clsx('child:font-normal child:text-tsm grid gap-2', className)}
    {...props}
  />
)

const BossDialog = ({ bossName, onClose }: BossDialogProps) => {
  const { bosses } = useTranslations()
  const i18n = bosses.BossDialog

  const info = useMemo(
    () => bossInfo.get(bossName as TrackedBossName),
    [bossName],
  )

  const statistics = useMemo(
    () => bossStatistics.get(bossName as TrackedBossName),
    [bossName],
  )

  return (
    <Dialog isOpen={!!info} onClose={onClose}>
      <div className="mb-3 mr-4 flex items-center gap-3.5">
        <SpritePortrait
          src={loadBossSrc(bossName ?? '')}
          alt={bossName ?? ''}
          offset
          width={64}
          height={64}
        />
        <div className="grid gap-0.5">
          <h3 className="text-l sm:text-xl">{bossName}</h3>
          {!!statistics?.fixedDaysFrequency &&
            statistics.fixedDaysFrequency.max > 2 && (
              <p className="text-xs">
                {templateString(i18n.respawns, {
                  min: statistics.fixedDaysFrequency.min + 1,
                  max: statistics.fixedDaysFrequency.max - 1,
                })}
              </p>
            )}
        </div>
      </div>

      <div className="custom-scrollbar -mr-4 grid max-h-[60vh] gap-6 overflow-auto pt-3 pr-4 sm:w-[70vw] sm:max-w-[606px]">
        {!!info?.loot && (
          <Section>
            <h3>{i18n.loot}</h3>

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
          </Section>
        )}

        {!!info?.raidMessages && (
          <Section>
            <h3>{i18n.raidMessages}</h3>

            <ul className="grid gap-1">
              {info.raidMessages.map(({ style, time, message }) => (
                <li
                  key={message}
                  title={style === 'HIGHLIGHT' ? i18n.bossWillSpawn : undefined}
                >
                  <strong className="tracking-wider">{time}:</strong>{' '}
                  <span
                    className={clsx(
                      {
                        REGULAR: '',
                        UNANNOUNCED: 'text-separator',
                        HIGHLIGHT: 'text-primaryHighlight',
                      }[style],
                    )}
                  >
                    {message}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!info?.locations && (
          <Section>
            <h3>
              {info.locations.length > 1 ? i18n.locations : i18n.location}
            </h3>

            <ul className="grid gap-5">
              {info.locations.map(({ src, description }) => (
                <li key={src} className="grid gap-2">
                  <iframe
                    src={src}
                    title={description}
                    className="h-80 w-full border-0 shadow"
                  />
                  {!!description && (
                    <caption className="text-tsm">
                      {i18n.descriptions[
                        description as keyof typeof i18n.descriptions
                      ] ?? description}
                    </caption>
                  )}
                </li>
              ))}
            </ul>

            <strong className="text-right" style={{ fontSize: 10 }}>
              {i18n.using}{' '}
              <a
                href={links.TIBIAMAPS}
                rel="noreferrer external nofollow"
                target="_blank"
                className="text-primaryHighlight"
              >
                TibiaMaps.io
              </a>{' '}
              ❤️
            </strong>
          </Section>
        )}
      </div>
    </Dialog>
  )
}

export default BossDialog
