import { links } from 'Constants'
import * as S from './styles'
import WavyBox from './WavyBox'

const KwaiVerticalBanner = (): JSX.Element => (
  <S.Wrapper>
    <S.ContainerLink
      href={links.KWAI_REF}
      target="_blank"
      rel="noopener noreferrer external"
    >
      Começar!
    </S.ContainerLink>

    <S.Heading>
      Ganhe <strong>dinheiro</strong> assistindo conteúdo no
    </S.Heading>
    <WavyBox>
      <S.KwaiLogo />
    </WavyBox>

    <a href={links.KWAI_REF} target="_blank" rel="noopener noreferrer external">
      <S.MagicButton>
        <S.ButtonText aria-label="Start now!">Começar!</S.ButtonText>
      </S.MagicButton>
    </a>

    <S.BottomText>Use o código:</S.BottomText>
    <S.Code>980 500 783</S.Code>
    <S.BottomText>para ganhar agora mesmo</S.BottomText>
    <S.Money>+</S.Money>
    <S.BottomText>ao cadastrar!</S.BottomText>
  </S.Wrapper>
)

export default KwaiVerticalBanner
