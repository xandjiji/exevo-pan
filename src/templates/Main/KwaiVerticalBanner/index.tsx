import * as S from './styles'
import WavyBox from './WavyBox'

const KwaiVerticalBanner = (): JSX.Element => (
  <S.Wrapper>
    <S.Heading>
      Ganhe <strong>dinheiro</strong> assistindo conteúdo no
      <WavyBox>
        <S.KwaiLogo />
      </WavyBox>
    </S.Heading>
  </S.Wrapper>
)

export default KwaiVerticalBanner
