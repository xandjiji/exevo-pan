import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { Tooltip } from 'components/Organisms'
import { links, email } from 'Constants'
import fansiteImg from 'assets/fansite-logo.png'
import { Hero, Pillar, Section, KsuTooltip, Footer } from './components'
import { sections } from './sections'
import * as S from './styles'
import { KsuData } from './types'

const About = ({ characterData }: { characterData: KsuData }): JSX.Element => {
  const {
    translations: { about },
  } = useTranslations()

  return (
    <S.Wrapper>
      <Hero />
      <S.BodyLayout>
        <Pillar sections={Object.values(sections)} />
        <S.SurfaceWrapper>
          <Section {...sections.EXEVO_PAN}>
            <p>
              {about.AboutExevoPan.p1}{' '}
              <span role="img" aria-label={about.AboutExevoPan.smilingEmoji}>
                😄
              </span>
            </p>
            <p>
              {about.AboutExevoPan.p2}{' '}
              <strong>{about.AboutExevoPan.strong}</strong>.{' '}
              {about.AboutExevoPan.p3}{' '}
              <a
                href={links.GITHUB_REPOSITORY}
                target="_blank"
                rel="noopener noreferrer external"
              >
                {about.AboutExevoPan.p4}
              </a>
              .
            </p>
            <p>
              {about.AboutExevoPan.p5}{' '}
              <S.Anchor href={`#${sections.CONTACT_INFORMATION.id}`}>
                {about.AboutExevoPan.contactChannels}
              </S.Anchor>
              .
            </p>
          </Section>

          <Section {...sections.ABOUT_ME}>
            <p>{about.AboutMe.p1}</p>
            <span style={{ display: 'block' }}>
              {about.AboutMe.p2}{' '}
              <Tooltip content={<KsuTooltip characterData={characterData} />}>
                <S.Character>Ksu</S.Character>
              </Tooltip>
              . {about.AboutMe.p3}{' '}
              <span role="img" aria-label={about.AboutMe.tongueEmoji}>
                😋
              </span>
              .
            </span>
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
              {about.AboutDisclaimer.p1}{' '}
              <a
                href={links.CIPSOFT}
                target="_blank"
                rel="noopener noreferrer external"
              >
                CipSoft
              </a>
              . {about.AboutDisclaimer.p2}
            </p>
            <p>{about.AboutDisclaimer.p3}</p>
            <p>{about.AboutDisclaimer.p4}</p>
            <Image
              src={fansiteImg}
              alt="Supported fansite"
              width="100"
              height="100"
            />
          </Section>

          <Section {...sections.CONTACT_INFORMATION}>
            <S.Ul>
              <S.Li>
                <S.MailIcon />
                <a href={links.EMAIL} target="_blank" rel="noopener noreferrer">
                  {email.MY_EMAIL}
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
}

export default About
