import { SpritePortrait, Text } from 'components/Atoms'
import * as S from './styles'
import { CosmeticEntry } from './types'

const data: CosmeticEntry[] = [
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

const TopStoreOutfits = (): JSX.Element => (
  <S.Ul>
    {data.map(({ name, percentage, price }) => (
      <S.Li key={name}>
        <S.SpriteWrapper title={`${name} - ${percentage}`}>
          <S.Percentage>{percentage}</S.Percentage>
          <div>
            <SpritePortrait
              offset
              alt={`${name} - ${percentage}`}
              src={`/sprites/storeoutfits/male/${name}_3.gif`}
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

export default TopStoreOutfits
