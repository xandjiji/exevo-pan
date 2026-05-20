import { memo } from 'react'
import { SpritePortrait, Text } from 'components/Atoms'
import { CosmeticEntry, TopCosmeticsProps } from './types'

const topOutfits: CosmeticEntry[] = [
  { name: 'Retro Warrior', percentage: '46%', price: 870 },
  { name: 'Retro Hunter', percentage: '13,3%', price: 870 },
  { name: 'Rune Master', percentage: '10,3%', price: 870 },
  { name: 'Conjurer', percentage: '8,3%', price: 720 },
  { name: 'Retro Citizen', percentage: '7,3%', price: 870 },
  { name: 'Retro Knight', percentage: '7,2%', price: 870 },
  { name: 'Ghost Blade', percentage: '6,8%', price: 600 },
  { name: 'Entrepreneur', percentage: '5,9%', price: 750 },
  { name: 'Sinister Archer', percentage: '5,6%', price: 600 },
  { name: 'Ranger', percentage: '5,2%', price: 750 },
]

const topMounts: CosmeticEntry[] = [
  { name: 'Gloomwurm', percentage: '9,4%', price: 870 },
  { name: 'Darkfire Devourer', percentage: '6,5%', price: 1500 },
  { name: 'Gorgon Hydra', percentage: '6,1%', price: 870 },
  { name: 'Prismatic Unicorn', percentage: '5,3%', price: 870 },
  { name: 'Tempest', percentage: '5,3%', price: 900 },
  { name: 'Silverneck', percentage: '4,4%', price: 720 },
  { name: 'Death Crawler', percentage: '4%', price: 600 },
  { name: 'Winter King', percentage: '3,9%', price: 450 },
  { name: 'Cerberus Champion', percentage: '3,8%', price: 750 },
  { name: 'Flamesteed', percentage: '3,6%', price: 900 },
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
