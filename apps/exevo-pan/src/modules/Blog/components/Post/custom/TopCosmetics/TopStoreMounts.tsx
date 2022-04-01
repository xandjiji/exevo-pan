import { SpritePortrait, Text } from 'components/Atoms'
import * as S from './styles'
import { CosmeticEntry } from './types'

const data: CosmeticEntry[] = [
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

const TopStoreMounts = (): JSX.Element => (
  <S.Ul>
    {data.map(({ name, percentage, price }) => (
      <S.Li key={name}>
        <S.SpriteWrapper title={`${name} - ${percentage}`}>
          <S.Percentage>{percentage}</S.Percentage>
          <div>
            <SpritePortrait
              offset
              alt={`${name} - ${percentage}`}
              src={`/sprites/storemounts/${name}.gif`}
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

export default TopStoreMounts
