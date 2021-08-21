import { Tooltip } from 'components/Organisms'
import { Hero, Section, KsuTooltip, Footer } from './components'
import * as S from './styles'
import { KsuData } from './types'

const About = ({ characterData }: { characterData: KsuData }): JSX.Element => (
  <S.Wrapper>
    <Hero />
    <S.BodyLayout>
      <S.SurfaceWrapper>
        <Section title="Exevo Pan">
          <p>
            Our goal is to help the Tibia community to grow, providing useful
            tools with the best user experience possible. This is a long-term
            project and we have many more features in our roadmap!{' '}
            <span role="img" aria-label="smiling">
              😄
            </span>
          </p>
          <p>
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
          </p>
          <p>
            Feel free to give us any feedback through our{' '}
            <S.Anchor href="#contact-section">contact-channels</S.Anchor>.
          </p>
        </Section>

        <Section title="About me">
          <p>
            My name is Alexandre Regali Seleghim, I&apos;m a front-end developer
            based in Brazil. My main interests orbits around web applications,
            UI/UX and design.
          </p>
          <span>
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
          </span>

          <p>
            Fun fact: I&apos;m also the same creator of{' '}
            <a
              href="https://www.youtube.com/channel/UC2srmu0R5yNikl3cnfqcomQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              TibiaClips
            </a>
            .
          </p>
        </Section>

        <Section title="Disclaimers">
          <p>
            <a
              href="https://www.tibia.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tibia
            </a>{' '}
            is a game made by{' '}
            <a
              href="https://www.cipsoft.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CipSoft
            </a>
            . All assets presented in this website are copyrighted by them and I
            don&apos;t own any of it.
          </p>
          <p>
            Most of the data used in this application used the official Tibia
            website as a source of truth. Despite of that, we can&apos;t
            guarantee that they are completely accurate and/or up-to-date.
          </p>
          <p>
            We promote that Tibia should be played in a fair and healthy manner.
            That means we are against cheating, real life harassment and
            anti-sportsmanship.
          </p>
        </Section>

        <Section title="Contact information" id="contact-section">
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
        </Section>
      </S.SurfaceWrapper>
    </S.BodyLayout>
    <Footer />
  </S.Wrapper>
)

export default About
