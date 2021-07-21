import * as S from './styles'
import { Title, Subtitle, ServerInfo } from './Parts'
import { CharCardProps } from './types'

const CharCard = ({ characterData, ...props }: CharCardProps): JSX.Element => {
  const {
    id,
    nickname,
    outfitId,
    level,
    vocationId,
    serverData,
    transfer,
    auctionEnd,
  } = characterData

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

        <S.LabeledTextBox labelText="PvP">
          <S.BattleyeStatus active={serverData.battleye} />
          {serverData.pvpType.string}
        </S.LabeledTextBox>

        <S.LabeledTextBox labelText="Auction End">
          <S.AuctionTimer endDate={new Date(auctionEnd * 1000)} />
        </S.LabeledTextBox>
        <S.LabeledTextBox>asda</S.LabeledTextBox>
      </S.InfoGrid>
    </S.Wrapper>
  )
}

export default CharCard
