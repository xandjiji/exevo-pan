import { memo } from 'react'
import clsx from 'clsx'
import { RareFrame } from 'components/Atoms'
import Image from 'next/image'
import { loadBossSrc } from 'utils'

const MiniBoss = ({ highlight = false, boss = 'Zarabustor' }) => (
  <div className="bg-surface relative flex h-12 w-28 items-center gap-2 rounded shadow-md">
    {highlight && <RareFrame />}
    <div
      className={clsx(
        'ml-2 h-7 w-7 rounded-md',
        highlight ? 'bg-primaryVariant' : 'bg-separator opacity-30',
      )}
    >
      {highlight && (
        <Image
          src={loadBossSrc(boss)}
          width={24}
          height={24}
          unoptimized
          alt={boss}
          className="-mt-1 -ml-0.5"
        />
      )}
    </div>
    <div className="flex flex-col gap-1.5">
      <div
        className={clsx(
          'h-1 w-12 rounded',
          highlight ? 'bg-rare' : 'bg-separator opacity-30',
        )}
      />
      <div className="bg-separator h-1 w-6 rounded opacity-30" />
    </div>
  </div>
)

const boss: Record<number, string> = {
  1: 'Yeti',
  2: 'Shlorg',
  3: 'Draptor',
}

const MiniBossGrid = () => (
  <div className="grid w-fit grid-cols-2 gap-2">
    {[1, 2, 3, 4, 5, 6].map((key) => (
      <MiniBoss key={key} highlight={key <= 3} boss={boss[key]} />
    ))}
  </div>
)

export default memo(MiniBossGrid)
