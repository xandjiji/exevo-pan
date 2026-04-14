import { memo } from 'react'
import { SpritePortrait, Text } from 'components/Atoms'
import { CosmeticEntry, TopCosmeticsProps } from './types'

const topOutfits: CosmeticEntry[] = [
  { name: 'Retro Warrior', percentage: '5,4%', price: 870 },
  { name: 'Retro Hunter', percentage: '1,5%', price: 870 },
  { name: 'Conjurer', percentage: '1.1%', price: 720 },
  { name: 'Rune Master', percentage: '1,1%', price: 870 },
  { name: 'Retro Knight', percentage: '0,8%', price: 870 },
  { name: 'Sinister Archer', percentage: '0.7%', price: 600 },
  { name: 'Entrepreneur', percentage: '0,8%', price: 750 },
  { name: 'Retro Citizen', percentage: '0,7%', price: 870 },
  { name: 'Ranger', percentage: '0,7%', price: 750 },
  { name: 'Champion', percentage: '0,5%', price: 570 },
]

const topMounts: CosmeticEntry[] = [
  { name: 'Shadow Draptor', percentage: '1,3%', price: 870 },
  { name: 'Crimson Ray', percentage: '0,7%', price: 870 },
  { name: 'Armoured War Horse', percentage: '0,6%', price: 870 },
  { name: 'Steelbeak', percentage: '0,5%', price: 870 },
  { name: 'Gloomwurm', percentage: '0,5%', price: 870 }, // new
  { name: 'Tempest', percentage: '0,4%', price: 900 },
  { name: 'Prismatic Unicorn', percentage: '0,4%', price: 870 },
  { name: 'Silverneck', percentage: '0,4%', price: 720 },
  { name: 'Night Waccoon', percentage: '0,3%', price: 750 },
  { name: 'Winter King', percentage: '0,3%', price: 450 }, // new
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
          className="text-tsm flex flex-col items-center gap-1.5 whitespace-nowrap"
        >
          <SpritePortrait
            title={`${name} - ${percentage}`}
            counter={percentage}
            offset
            alt={`${name} - ${percentage}`}
            src={resolver(name)}
            width={64}
            height={64}
          />

          <p style={{ marginBottom: -6 }}>{name}</p>

          <Text.TibiaCoin value={price} />
        </li>
      ))}
    </ul>
  )
}

export default memo(TopCosmetics)
