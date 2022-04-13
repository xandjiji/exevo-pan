/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import UnlicenseIcon from 'assets/svgs/unlicense.svg'
import GithubIcon from 'assets/svgs/github.svg'
import { links, routes } from 'Constants'

const listItems = [
  { href: routes.HOME, content: 'currentAuctions' },
  { href: routes.BAZAAR_HISTORY, content: 'bazaarHistory' },
  { href: routes.STATISTICS, content: 'statistics' },
  { href: routes.ADVERTISE, content: 'advertise' },
  { href: routes.BLOG, content: 'blog' },
  { href: routes.ABOUT, content: 'about' },
]

const Link = ({ className, rel, ...props }: JSX.IntrinsicElements['a']) => (
  <a
    rel={clsx('noopener noreferrer external', rel)}
    className={clsx('text-onPrimary text-xs tracking-wider', className)}
    target="_blank"
    {...props}
  />
)

const Footer = () => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <footer className="bg-primary text-onPrimary inner-container z-71 relative py-6 text-xs tracking-wider transition-colors">
      <nav className="inner-container">
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {listItems.map(({ href, content }) => (
            <li
              key={href}
              className="text-s text-onPrimary/50 after:ml-3 after:content-['|'] last:after:content-['']"
            >
              <NextLink href={href}>
                <a className="text-s text-onPrimary cursor-pointer tracking-wider md:text-base">
                  {common.Header.nav[content]}
                </a>
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-5 flex items-center justify-center">
        <UnlicenseIcon
          aria-label="Unlicensed"
          className="fill-onPrimary mx-1 h-3 w-3"
        />
        {new Date().getFullYear()} {common.FooterTitle}
        <Link className="ml-1" href={links.GITHUB_PROFILE} rel="author">
          xandjiji
        </Link>
        .
        <Link
          className="ml-2"
          href={links.GITHUB_REPOSITORY}
          title={common.RepoLinkText}
        >
          <GithubIcon className="fill-onPrimary clickable rounded-full" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
