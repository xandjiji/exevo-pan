import { Tooltip } from 'components/Organisms'
import { links } from 'Constants'
import { Hero, Pillar, Section, KsuTooltip, Footer } from './components'
import { sections } from './sections'
import * as S from './styles'
import { KsuData } from './types'

const About = ({ characterData }: { characterData: KsuData }): JSX.Element => (
  <S.Wrapper>
    <Hero />
    <S.BodyLayout>
      <Pillar sections={Object.values(sections)} />
      <S.SurfaceWrapper>
        <Section {...sections.EXEVO_PAN}>
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
            <strong>100% free, open-source and unlicensed</strong>. This
            means that not only you can contribute or fork this project, but we
            encourage you to do so. You can start in the official GitHub{' '}
            <a
              href={links.GITHUB_REPOSITORY}
              target="_blank"
              rel="noopener noreferrer external"
            >
              repository
            </a>
            .
          </p>
          <p>
            Feel free to give us any feedback through our{' '}
            <S.Anchor href={`#${sections.CONTACT_INFORMATION.id}`}>
              contact-channels
            </S.Anchor>
            .
          </p>
        </Section>

        <Section {...sections.ABOUT_ME}>
          <p>
            My name is Alexandre Regali Seleghim, I&apos;m a front-end developer
            based in Brazil. My main interests orbits around web applications,
            UI/UX and design.
          </p>
          <span style={{ display: 'block' }}>
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
              href={links.TIBIACLIPS}
              target="_blank"
              rel="noopener noreferrer external"
            >
              TibiaClips
            </a>
            .
          </p>
        </Section>

        <Section {...sections.DISCLAIMER}>
          <p>
            <a
              href={links.TIBIA}
              target="_blank"
              rel="noopener noreferrer external"
            >
              Tibia
            </a>{' '}
            is a game made by{' '}
            <a
              href={links.CIPSOFT}
              target="_blank"
              rel="noopener noreferrer external"
            >
              CipSoft
            </a>
            . All assets presented in this website are copyrighted by them and I
            don&apos;t own any of it.
          </p>
          <p>
            Most of the data in this application used the official Tibia
            website as a source of truth. Despite of that, we can&apos;t
            guarantee that they are completely accurate and/or up-to-date.
          </p>
          <p>
            We promote that Tibia should be played in a fair and healthy manner.
            That means we are against cheating, real life harassment and
            anti-sportsmanship.
          </p>
        </Section>

        <Section {...sections.CONTACT_INFORMATION}>
          <S.Ul>
            <S.Li>
              <S.MailIcon />
              <a href={links.EMAIL} target="_blank" rel="noopener noreferrer">
                xandjiji@gmail.com
              </a>
            </S.Li>
            <S.Li>
              <S.GithubIcon />
              <a
                href={links.GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer external author"
              >
                {links.GITHUB_PROFILE}
              </a>
            </S.Li>
            <S.Li>
              <S.LinkedinIcon />
              <a
                href={links.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer external author"
              >
                {links.LINKEDIN}
              </a>
            </S.Li>
          </S.Ul>
        </Section>
      </S.SurfaceWrapper>
    </S.BodyLayout>
    <Footer />
  </S.Wrapper>
)

export default About
