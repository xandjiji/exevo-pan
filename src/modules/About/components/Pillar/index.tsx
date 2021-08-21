import * as S from './styles'

const Pillar = (): JSX.Element => (
  <S.Aside>
    <S.Nav>
      <S.Title>Contents</S.Title>
      <S.Ul>
        <S.Li>
          <a href="#exevo-pan-section">Exevo Pan</a>
        </S.Li>
        <S.Li>
          <a href="#about-me-section">About me</a>
        </S.Li>
        <S.Li>
          <a href="#disclaimer-section">Disclaimer</a>
        </S.Li>
        <S.Li>
          <a href="#contact-section">Contact information</a>
        </S.Li>
      </S.Ul>
    </S.Nav>
  </S.Aside>
)

export default Pillar
