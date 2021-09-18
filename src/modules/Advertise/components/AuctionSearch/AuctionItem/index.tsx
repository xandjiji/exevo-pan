import * as S from './styles'
import { AuctionItemProps } from './types'

const vocationEnum = {
  '0': 'None',
  '1': 'Elite Knight',
  '2': 'Royal Paladin',
  '3': 'Master Sorcerer',
  '4': 'Elder Druid',
  '10': 'None',
  '11': 'Knight',
  '12': 'Paladin',
  '13': 'Sorcerer',
  '14': 'Druid',
} as Record<string, string>

const AuctionItem = ({
  nickname,
  level,
  vocationId,
  outfitId,
  ...props
}: AuctionItemProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.SpritePortrait
      src={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
      alt={nickname}
      title={nickname}
    />
    <div>
      <S.Nickname>{nickname}</S.Nickname>

      <S.Info>
        Level {level}
        {' - '}
        {level >= 20
          ? vocationEnum[vocationId]
          : vocationEnum[`1${vocationId}`]}
      </S.Info>
    </div>
  </S.Wrapper>
)

export default AuctionItem
