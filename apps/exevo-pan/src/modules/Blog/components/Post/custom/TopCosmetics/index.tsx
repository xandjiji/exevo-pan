import { memo } from 'react'
import { SpritePortrait, Text, ActiveCount } from 'components/Atoms'
import { TopCosmeticsProps, CosmeticEntry } from './types'

const topOutfits: CosmeticEntry[] = [
  { name: 'Retro Warrior', percentage: '4%', price: 870 },
  { name: 'Conjurer', percentage: '1%', price: 720 },
  { name: 'Retro Hunter', percentage: '1%', price: 870 },
  { name: 'Entrepreneur', percentage: '0,7%', price: 750 },
  { name: 'Sinister Archer', percentage: '0,6%', price: 600 },
  { name: 'Rune Master', percentage: '0,6%', price: 870 },
  { name: 'Ranger', percentage: '0,6%', price: 750 },
  { name: 'Retro Knight', percentage: '0,5%', price: 870 },
  { name: 'Retro Citizen', percentage: '0,5%', price: 870 },
  { name: 'Champion', percentage: '0,5%', price: 570 },
]

const topMounts: CosmeticEntry[] = [
  { name: 'Shadow Draptor', percentage: '1,6%', price: 870 },
  { name: 'Crimson Ray', percentage: '1%', price: 870 },
  { name: 'Armoured War Horse', percentage: '0,8%', price: 870 },
  { name: 'Steelbeak', percentage: '0,7%', price: 870 },
  { name: 'Death Crawler', percentage: '0,6%', price: 600 },
  { name: 'Tempest', percentage: '0,5%', price: 900 },
  { name: 'Prismatic Unicorn', percentage: '0,5%', price: 870 },
  { name: 'Silverneck', percentage: '0,5%', price: 720 },
  { name: 'Winter King', percentage: '0,3%', price: 450 },
  { name: 'Night Waccoon', percentage: '0,3%', price: 750 },
]

const TopCosmetics = ({ mounts }: TopCosmeticsProps) => {
  const data = mounts ? topMounts : topOutfits
  const resolver = mounts
    ? (name: string) => `/sprites/storemounts/${name}.gif`
    : (name: string) => `/sprites/storeoutfits/male/${name}_3.gif`

  return (
    <ul data-mounts={!!mounts} className="flex flex-wrap justify-center gap-6">
      {data.map(({ name, percentage, price }) => (
        <li
          key={name}
          className="text-tsm flex flex-col items-center gap-[6px] whitespace-nowrap"
        >
          <div title={`${name} - ${percentage}`} className="relative w-min">
            <ActiveCount
              className="z-2 absolute top-[-6px] right-0 py-[2px] px-1"
              style={{
                borderRadius: 4,
                width: 'fit-content',
                height: 'unset',
                transform: 'translateX(50%)',
              }}
            >
              {percentage}
            </ActiveCount>
            <div>
              <SpritePortrait
                offset
                alt={`${name} - ${percentage}`}
                src={resolver(name)}
                width={64}
                height={64}
              />
            </div>
          </div>

          <p style={{ marginBottom: -6 }}>{name}</p>

          <Text.TibiaCoin value={price} />
        </li>
      ))}
    </ul>
  )
}

export default memo(TopCosmetics)
