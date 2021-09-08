import { links } from 'Constants'
import * as S from './styles'

const InPagePush = (): JSX.Element => (
  <S.Wrapper>
    <S.ContainerLink
      href={links.KWAI_REF}
      target="_blank"
      rel="noopener noreferrer external"
    >
      Começar!
    </S.ContainerLink>
    <S.KwaiLogo />
    <div>
      <S.Heading>Ganhe dinheiro assistindo conteúdo!</S.Heading>
      <S.SubHeading>
        baixe agora e comece ganhando até <strong>R$10,00</strong>
      </S.SubHeading>
    </div>
  </S.Wrapper>
)

export default InPagePush
