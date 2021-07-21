import * as S from './styles'
import { Title, Subtitle, ServerInfo } from './Parts'
import { CharCardProps } from './types'

const CharCard = ({ characterData, ...props }: CharCardProps): JSX.Element => {
  const { id, nickname, outfitId, level, vocationId, serverData, transfer } =
    characterData

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

      <S.InfoGrid>
        <ServerInfo
          serverData={serverData}
          nickname={nickname}
          transfer={transfer}
        />
        <S.LabeledTextBox>asda</S.LabeledTextBox>
        <S.LabeledTextBox>asda</S.LabeledTextBox>
        <S.LabeledTextBox>asda</S.LabeledTextBox>
      </S.InfoGrid>
    </S.Wrapper>
  )
}

export default CharCard
