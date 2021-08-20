import { Hero } from './components'
import * as S from './styles'

const About = (): JSX.Element => (
  <S.Wrapper>
    <Hero />
    <S.SurfaceWrapper>
      <S.Section>
        <S.Paragraph>
          My name is Alexandre Regali Seleghim, I&apos;m a front-end developer
          based in Brazil.
        </S.Paragraph>
        <S.Paragraph>
          Donec eget ultrices leo. Curabitur non tincidunt purus. Sed ornare
          turpis sed elit vehicula, et dapibus tortor eleifend. Vivamus dictum
          sem eu tellus tincidunt, non euismod ligula pulvinar. Duis at posuere
          quam. Etiam tincidunt et nisi non commodo. Vestibulum vitae tortor
          nibh. Sed tristique, nisi nec tincidunt euismod, arcu lorem commodo
          eros, et rutrum turpis justo id eros.
        </S.Paragraph>
      </S.Section>
      <S.Section>
        <S.H2>Contact information</S.H2>
        <S.Ul>
          <S.Li>
            <S.MailIcon />
            <S.Link
              href="mailto:xandjiji@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              xandjiji@gmail.com
            </S.Link>
          </S.Li>
          <S.Li>
            <S.GithubIcon />
            <S.Link
              href="https://github.com/xandjiji"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/xandjiji
            </S.Link>
          </S.Li>
          <S.Li>
            <S.LinkedinIcon />
            <S.Link
              href="https://www.linkedin.com/in/xandjiji"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.linkedin.com/in/xandjiji
            </S.Link>
          </S.Li>
        </S.Ul>
      </S.Section>
    </S.SurfaceWrapper>
  </S.Wrapper>
)

export default About
