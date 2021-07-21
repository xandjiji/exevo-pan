import * as S from './styles'
import { Title, Subtitle } from './Parts'
import { CharCardProps } from './types'

const CharCard = ({ characterData, ...props }: CharCardProps): JSX.Element => {
  const { id, nickname, outfitId, level, vocationId } = characterData

  return (
    <S.Wrapper {...props}>
      <S.Head>
        <S.SpritePortrait
          src={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
          alt={nickname}
          title={nickname}
        />

        <S.HeadInfo>
          <Title characterId={id}>{nickname}</Title>
          <Subtitle level={level} vocation={vocationId} />
        </S.HeadInfo>

        <S.FavButton characterObject={characterData} />
      </S.Head>
    </S.Wrapper>
  )
}

export default CharCard
