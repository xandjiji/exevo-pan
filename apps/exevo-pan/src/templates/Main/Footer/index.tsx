/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import Image from 'next/image'
import { UnlicenseIcon, GithubIcon } from 'assets/svgs'
import { links, routes } from 'Constants'
import edgarSrc from 'assets/edgartc.png'
import reiDosCoinsSrc from 'assets/reidoscoins.png'
import tbjSrc from 'assets/tibiablackjack.png'
import { FooterProps, RouteItem } from './types'

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
    rel={clsx('noopener noreferrer external', rel)}
    className={clsx('text-xs tracking-wider', className)}
    target="_blank"
    {...props}
  />
)

const Footer = ({ variant = 'primary' }: FooterProps) => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <footer
      className={clsx(
        'inner-container z-footer relative py-6 text-xs tracking-wider transition-colors',
        variant === 'primary' && 'bg-primary text-onPrimary',
        variant === 'surface' && 'bg-surface text-onSurface',
      )}
    >
      <div
        className={clsx(
          'flex flex-col items-center justify-center gap-8 md:flex-row-reverse md:gap-24',
          variant === 'primary' && 'child:max-w-[320px] sm:child:max-w-[500px]',
        )}
      >
        {variant === 'primary' && (
          <div className="flex flex-wrap items-center justify-center gap-6 md:flex-nowrap">
            <a
              className="card bg-black/40 p-2"
              target="_blank"
              rel="noopener external nofollow"
              href={links.TIBIA_BLACKJACK}
            >
              <Image
                src={tbjSrc}
                width={97}
                height={61}
                alt="Tibia Blackjack"
              />
            </a>

            <a
              href={links.EDGAR_TC}
              target="_blank"
              rel="noopener external nofollow"
            >
              <Image src={edgarSrc} width={62} height={100} alt="Edgar Tc" />
            </a>

            <a
              href={links.REI_DOS_COINS}
              target="_blank"
              rel="noopener external nofollow"
            >
              <Image
                src={reiDosCoinsSrc}
                width={86}
                height={100}
                alt="Rei dos Coins"
              />
            </a>
          </div>
        )}

        <div>
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {listItems.map(({ href, content, gradient }) => (
                <li
                  key={href}
                  className={clsx(
                    "text-s after:ml-3 after:content-['|'] last:after:content-['']",
                    variant === 'primary' && 'text-onPrimary/50',
                    variant === 'surface' && 'text-onSurface/50',
                  )}
                >
                  <NextLink
                    href={href}
                    className={clsx(
                      'text-s cursor-pointer tracking-wider md:text-base',
                      gradient &&
                        variant === 'surface' &&
                        'rare-gradient-text whitespace-nowrap font-bold',
                      variant === 'primary' && 'text-onPrimary',
                      variant === 'surface' && 'text-onSurface',
                    )}
                  >
                    {common.Header.nav[content]}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 flex items-center justify-center">
            <UnlicenseIcon
              aria-label="Unlicensed"
              className={clsx(
                'mx-1 h-3 w-3',
                variant === 'primary' && 'fill-onPrimary',
                variant === 'surface' && 'fill-onSurface',
              )}
            />
            {new Date().getFullYear()} {common.FooterTitle}
            <Link
              className={clsx(
                'ml-1',
                variant === 'primary' && 'text-onPrimary',
                variant === 'surface' && 'text-onSurface',
              )}
              href={links.GITHUB_PROFILE}
              rel="author"
            >
              xandjiji
            </Link>
            .
            <Link
              className="ml-2"
              href={links.GITHUB_REPOSITORY}
              title={common.RepoLinkText}
            >
              <GithubIcon
                className={clsx(
                  'clickable rounded-full',
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
