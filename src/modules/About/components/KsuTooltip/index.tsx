import * as S from './styles'

const KsuTooltip = (): JSX.Element => (
  <S.Wrapper>
    <S.SpritePortrait src="https://static.tibia.com/images/charactertrade/outfits/152_3.gif" />
    <div>
      <S.Nickname>
        Ksu
        <S.Link
          href="https://www.tibia.com/community/?name=Ksu"
          target="_blank"
          rel="noreferrer"
        >
          <S.ExternalIcon />
          Go to character page
        </S.Link>
      </S.Nickname>
      <S.Description>Level 425 - Elite Knight (Belobra)</S.Description>
    </div>{' '}
  </S.Wrapper>
)

export default KsuTooltip
