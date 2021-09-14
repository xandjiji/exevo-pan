import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { Tooltip } from 'components/Organisms'
import { links } from 'Constants'
import fansiteImg from 'assets/fansite-logo.png'
import { Hero, Pillar, Section, KsuTooltip, Footer } from './components'
import { sections } from './sections'
import * as S from './styles'
import { KsuData } from './types'

const About = ({ characterData }: { characterData: KsuData }): JSX.Element => {
  const { t } = useTranslation('about')

  return (
    <S.Wrapper>
      <Hero />
      <S.BodyLayout>
        <Pillar sections={Object.values(sections)} />
        <S.SurfaceWrapper>
          <Section {...sections.EXEVO_PAN}>
            <p>
              {t('AboutExevoPan.p1')}{' '}
              <span role="img" aria-label={t('AboutExevoPan.smilingEmoji')}>
                😄
              </span>
            </p>
            <p>
              {t('AboutExevoPan.p2')}{' '}
              <strong>{t('AboutExevoPan.strong')}</strong>.{' '}
              {t('AboutExevoPan.p3')}{' '}
              <a
                href={links.GITHUB_REPOSITORY}
                target="_blank"
                rel="noopener noreferrer external"
              >
                {t('AboutExevoPan.p4')}
              </a>
              .
            </p>
            <p>
              {t('AboutExevoPan.p5')}{' '}
              <S.Anchor href={`#${sections.CONTACT_INFORMATION.id}`}>
                {t('AboutExevoPan.contactChannels')}
              </S.Anchor>
              .
            </p>
          </Section>

          <Section {...sections.ABOUT_ME}>
            <p>{t('AboutMe.p1')}</p>
            <span style={{ display: 'block' }}>
              {t('AboutMe.p2')}{' '}
              <Tooltip content={<KsuTooltip characterData={characterData} />}>
                <S.Character>Ksu</S.Character>
              </Tooltip>
              . {t('AboutMe.p3')}{' '}
              <span role="img" aria-label={t('AboutMe.tongueEmoji')}>
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
              {t('AboutDisclaimer.p1')}{' '}
              <a
                href={links.CIPSOFT}
                target="_blank"
                rel="noopener noreferrer external"
              >
                CipSoft
              </a>
              . {t('AboutDisclaimer.p2')}
            </p>
            <p>{t('AboutDisclaimer.p3')}</p>
            <p>{t('AboutDisclaimer.p4')}</p>
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
}

export default About
