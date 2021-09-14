import { useTranslation } from 'next-i18next'
import * as S from './styles'

const Hero = (): JSX.Element => {
  const { t } = useTranslation('about')

  return (
    <S.Wrapper>
      <S.HeroImageWrapper>
        <S.HeroImage unoptimized priority alt="Exevo Pan Logo" />
      </S.HeroImageWrapper>
      <S.TitleWrapper>
        <S.Title>{t('HeroTitle')}</S.Title>
        <S.Subtitle>(hi tibia yes)</S.Subtitle>
      </S.TitleWrapper>
    </S.Wrapper>
  )
}

export default Hero
