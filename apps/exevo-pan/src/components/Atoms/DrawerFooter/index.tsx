import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import clsx from 'clsx'
import { GithubIcon } from 'assets/svgs'
import { links } from 'Constants'

const DrawerFooter = ({
  className,
  ...props
}: JSX.IntrinsicElements['footer']) => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <footer
      className={clsx(
        'inner-padding bg-primary text-s text-onPrimary flex h-[60px] items-center py-3 font-light',
        className,
      )}
      {...props}
    >
      <a
        className="text-none"
        href={links.GITHUB_REPOSITORY}
        target="_blank"
        rel="noreferrer noopener external"
      >
        <GithubIcon className="fill-onPrimary clickable mr-4 rounded-full p-0" />
        {common.RepoLinkText}
      </a>
      <span>
        {common.MadeBy}{' '}
        <a
          className="text-s text-onPrimary font-normal tracking-wider"
          href={links.GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer author external"
        >
          xandjiji
        </a>
      </span>
    </footer>
  )
}

export default memo(DrawerFooter)
