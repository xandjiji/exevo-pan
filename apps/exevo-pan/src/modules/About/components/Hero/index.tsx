import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

const Hero = (): JSX.Element => {
  const {
    translations: { about },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.HeroImageWrapper>
        <S.HeroImage unoptimized priority alt="Exevo Pan Logo" />
      </S.HeroImageWrapper>
      <S.TitleWrapper>
        <S.Title>{about.HeroTitle}</S.Title>
        <S.Subtitle>(hi tibia yes)</S.Subtitle>
      </S.TitleWrapper>
    </S.Wrapper>
  )
}

export default Hero
