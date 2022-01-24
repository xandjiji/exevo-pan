import Image from 'next/image'
import * as S from './styles'
import { HeroProps } from './types'

const Hero = ({ title, subtitle, src, ...props }: HeroProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.ImageWrapper className="hero-image">
      <Image
        src={src}
        alt={title}
        layout="fixed"
        width={240}
        height={240}
        priority
      />
    </S.ImageWrapper>

    <S.TitleWrapper>
      <S.Title className="hero-title">{title}</S.Title>
      {!!subtitle && (
        <S.Subtitle className="hero-subtitle">{subtitle}</S.Subtitle>
      )}
    </S.TitleWrapper>
  </S.Wrapper>
)

export default Hero
