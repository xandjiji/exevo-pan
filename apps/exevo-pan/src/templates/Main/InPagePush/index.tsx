import { useState } from 'react'
import { links } from 'Constants'
import * as S from './styles'

const InPagePush = (): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
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

      <S.CloseButton
        aria-label="Close push modal"
        onClick={() => setIsVisible(false)}
      />
    </S.Wrapper>
  )
}

export default InPagePush
