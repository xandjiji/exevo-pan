import { Tooltip } from 'components/Organisms'
import { Hero, KsuTooltip } from './components'
import * as S from './styles'
import { KsuData } from './types'

const About = ({ characterData }: { characterData: KsuData }): JSX.Element => (
  <S.Wrapper>
    <Hero />
    <S.BodyLayout>
      <S.SurfaceWrapper>
        <S.Section>
          <S.H2>Exevo Pan</S.H2>
          <S.Paragraph>
            Our goal is to help the Tibia community to grow, providing useful
            tools with the best user experience possible. This is a long-term
            project and we have many more features in our roadmap!{' '}
            <span role="img" aria-label="smiling">
              😄
            </span>
          </S.Paragraph>
          <S.Paragraph>
            This website is{' '}
            <strong>100% free and open-source and unlicensed</strong>. This
            means that not only you can contribute or fork this project, but we
            encourage you to do so. You can start{' '}
            <a
              href="https://github.com/xandjiji/exevo-pan"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            , in the official GitHub repository.
          </S.Paragraph>
          <S.Paragraph>
            Feel free to give us any feedback through our{' '}
            <S.Anchor href="#contact-section">contact-channels</S.Anchor>.
          </S.Paragraph>
        </S.Section>
        <S.Section>
          <S.H2>About me</S.H2>
          <S.Paragraph>
            My name is Alexandre Regali Seleghim, I&apos;m a front-end developer
            based in Brazil. My main interests orbits around web applications,
            UI/UX and design.
          </S.Paragraph>
          <S.Paragraph>
            My character nickname is{' '}
            <Tooltip content={<KsuTooltip characterData={characterData} />}>
              <S.Character>Ksu</S.Character>
            </Tooltip>
            . Though I don&apos;t play the game much anymore, eventually you may
            find me online as a rare boss spawn{' '}
            <span role="img" aria-label="tongue">
              😋
            </span>
            .
          </S.Paragraph>

          <S.Paragraph>
            Fun fact: I&apos;m also the same creator of{' '}
            <a
              href="https://www.youtube.com/channel/UC2srmu0R5yNikl3cnfqcomQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              TibiaClips
            </a>
            .
          </S.Paragraph>
        </S.Section>
        <S.Section id="contact-section">
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
    </S.BodyLayout>
  </S.Wrapper>
)

export default About
