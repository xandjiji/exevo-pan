import { memo } from 'react'
import { SpritePortrait, Text } from 'components/Atoms'
import * as S from './styles'
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

const TopCosmetics = ({ mounts }: TopCosmeticsProps): JSX.Element => {
  const data = mounts ? topMounts : topOutfits
  const resolver = mounts
    ? (name: string) => `/sprites/storemounts/${name}.gif`
    : (name: string) => `/sprites/storeoutfits/male/${name}_3.gif`

  return (
    <S.Ul data-mounts={!!mounts}>
      {data.map(({ name, percentage, price }) => (
        <S.Li key={name}>
          <S.SpriteWrapper title={`${name} - ${percentage}`}>
            <S.Percentage>{percentage}</S.Percentage>
            <div>
              <SpritePortrait
                offset
                alt={`${name} - ${percentage}`}
                src={resolver(name)}
                width={64}
                height={64}
              />
            </div>
          </S.SpriteWrapper>

          <p style={{ marginBottom: -6 }}>{name}</p>

          <Text.TibiaCoin value={price} />
        </S.Li>
      ))}
    </S.Ul>
  )
}

export default memo(TopCosmetics)
