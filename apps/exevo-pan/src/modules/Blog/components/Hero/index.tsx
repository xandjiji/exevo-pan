import { useState } from 'react'
import * as S from './styles'
import { HeroProps } from './types'

const Hero = ({ title, subtitle, src, ...props }: HeroProps): JSX.Element => {
  const [loaded, setLoaded] = useState(false)

  return (
    <S.Wrapper {...props}>
      <S.ImageWrapper className="hero-image" data-loaded={loaded}>
        <S.HeroImage
          src={src}
          alt={title}
          layout="intrinsic"
          width={240}
          height={240}
          onLoad={() => setLoaded(true)}
          priority
        />
      </S.ImageWrapper>
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        {!!subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TitleWrapper>
    </S.Wrapper>
  )
}

export default Hero
