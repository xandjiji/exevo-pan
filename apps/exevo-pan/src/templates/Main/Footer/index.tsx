/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from 'clsx'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { loadRawSrc } from 'utils'
import { ExevoPanIcon, GithubIcon, UnlicenseIcon } from 'assets/svgs'
import { links, routes } from 'Constants'
import { useLocalizedHref } from 'hooks/useLocalizedHref'
import { FooterProps, RouteItem } from './types'

const tbjSrc = loadRawSrc('/assets/tibiablackjack.png')
const rdcSrc = loadRawSrc('/reidoscoins.png')

const listItems: RouteItem[] = [
  { href: routes.HOME, content: 'charBazaar' },
  { href: routes.BOSSES.TRACKER, content: 'bossTracker' },
  { href: routes.CALCULATORS, content: 'calculators' },
  { href: routes.STATISTICS, content: 'statistics' },
  { href: routes.ADVERTISE, content: 'advertise' },
  { href: routes.EXEVOPRO, content: 'exevopro', gradient: true },
  { href: routes.BLOG, content: 'blog' },
  { href: routes.ABOUT, content: 'about' },
]

const Link = ({ className, rel, ...props }: JSX.IntrinsicElements['a']) => (
  <a
    rel={clsx('noopener external', rel)}
    className={clsx('text-xs tracking-wider', className)}
    target="_blank"
    {...props}
  />
)

const Card = ({
  variant = 'primary',
  className,
  ...props
}: { variant?: 'primary' | 'secondary' } & JSX.IntrinsicElements['div']) => (
  <div
    {...props}
    className={clsx(
      variant === 'primary'
        ? 'bg-surface/75 flex items-center gap-2 py-2'
        : 'bg-black/40',
      'card clickable py-2',
      className,
    )}
  />
)

const Footer = ({ variant = 'primary' }: FooterProps) => {
  const { common } = useTranslations()

  return (
    <footer
      className={clsx(
        'inner-container z-footer relative py-6 text-xs tracking-wider transition-colors',
        variant === 'primary' && 'bg-primary text-onPrimary',
        variant === 'surface' && 'bg-surface text-onSurface',
      )}
    >
      <div className="mx-auto grid w-fit gap-8">
        {variant === 'primary' && (
          <div className="flex flex-col flex-wrap items-center justify-center gap-6 sm:flex-row">
            <a href={useLocalizedHref(routes.EXEVOPRO)}>
              <Card>
                <ExevoPanIcon width={36} height={36} />

                <span>
                  {templateMessage(common.exevoProCTA, {
                    exevoPro: (
                      <strong className="rare-gradient-text block whitespace-nowrap text-base tracking-wide">
                        Exevo Pro
                      </strong>
                    ),
                  })}
                </span>
              </Card>
            </a>

            <div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  target="_blank"
                  rel="noopener external nofollow"
                  href={links.TIBIA_BLACKJACK}
                >
                  <Card variant="secondary">
                    <img
                      src={tbjSrc}
                      width={97}
                      height={61}
                      alt="Tibia Blackjack"
                      loading="lazy"
                      style={{ filter: 'drop-shadow(0 0 1px black)' }}
                    />
                  </Card>
                </a>

                <a
                  href={links.REI_DOS_COINS}
                  target="_blank"
                  rel="noopener external nofollow"
                >
                  <Card variant="secondary">
                    <img
                      src={rdcSrc}
                      width={51}
                      height={61}
                      alt="Rei dos Coins"
                      loading="lazy"
                    />
                  </Card>
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-5">
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {listItems.map(({ href, content, gradient }) => (
                <li
                  key={href}
                  className={clsx(
                    "text-s after:ml-3 after:content-['|'] last:after:ml-0 last:after:content-['']",
                    variant === 'primary' && 'text-onPrimary/50',
                    variant === 'surface' && 'text-onSurface/50',
                  )}
                >
                  <a
                    href={useLocalizedHref(href)}
                    className={clsx(
                      'text-s cursor-pointer tracking-wider md:text-base',
                      gradient &&
                        variant === 'surface' &&
                        'rare-gradient-text whitespace-nowrap font-bold',
                      variant === 'primary' && 'text-onPrimary',
                      variant === 'surface' && 'text-onSurface',
                    )}
                  >
                    {
                      common.Header.nav[
                        content as keyof typeof common.Header.nav
                      ]
                    }
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-center">
            <UnlicenseIcon
              aria-label="Unlicensed"
              className={clsx(
                'mx-1 h-3 w-3',
                variant === 'primary' && 'fill-onPrimary',
                variant === 'surface' && 'fill-onSurface',
              )}
            />
            <span>
              {new Date().getFullYear()} {common.FooterTitle}{' '}
              <Link
                className={clsx(
                  variant === 'primary' && 'text-onPrimary',
                  variant === 'surface' && 'text-onSurface',
                )}
                href={links.GITHUB_PROFILE}
                rel="author"
              >
                xandjiji
              </Link>
              .
            </span>
            <Link
              className="ml-2"
              href={links.GITHUB_REPOSITORY}
              title={common.RepoLinkText}
            >
              <GithubIcon
                className={clsx(
                  'clickable h-6 w-6 rounded-full',
                  variant === 'primary' && 'fill-onPrimary',
                  variant === 'surface' && 'fill-onSurface',
                )}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

// <a
//   href={common.NoPing.link}
//   target="_blank"
//   rel="noopener external nofollow"
// >
//   <Card variant="secondary">
//     <img
//       src={noPingSrc}
//       width={234}
//       height={61}
//       alt="NoPing"
//       loading="lazy"
//       style={{ filter: 'drop-shadow(0 0 2px black)' }}
//     />
//   </Card>
// </a>
