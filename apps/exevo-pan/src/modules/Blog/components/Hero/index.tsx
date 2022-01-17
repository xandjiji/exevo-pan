import * as S from './styles'
import { HeroProps } from './types'

const Hero = ({ title, subtitle, src, ...props }: HeroProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.ImageWrapper className="hero-image">
      <S.HeroImage
        src={src}
        alt="Title"
        layout="intrinsic"
        width={240}
        height={240}
      />
    </S.ImageWrapper>
    <S.TitleWrapper>
      <S.Title>{title}</S.Title>
      {!!subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
    </S.TitleWrapper>
  </S.Wrapper>
)

export default Hero
