/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { UnlicenseIcon, GithubIcon } from 'assets/svgs'
import { links, routes } from 'Constants'
import { FooterProps, RouteItem } from './types'

const listItems: RouteItem[] = [
  { href: routes.HOME, content: 'charBazaar' },
  { href: routes.BOSSES.MAIN, content: 'bossTracker' },
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
      <nav className="inner-container">
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
                    'from-primaryHighlight to-rare whitespace-nowrap bg-gradient-to-r bg-clip-text font-bold text-transparent',
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
    </footer>
  )
}

export default Footer
