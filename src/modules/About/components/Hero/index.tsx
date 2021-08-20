import * as S from './styles'

const Hero = (): JSX.Element => (
  <S.Wrapper>
    <S.HeroImageWrapper>
      <S.HeroImage unoptimized alt="Exevo Pan Logo" />
    </S.HeroImageWrapper>
    <S.TitleWrapper>
      <S.Title>About us</S.Title>
      <S.Subtitle>(hi tibia yes)</S.Subtitle>
    </S.TitleWrapper>
  </S.Wrapper>
)

export default Hero
