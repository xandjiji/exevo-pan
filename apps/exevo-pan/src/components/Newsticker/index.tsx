import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { FadeImage, Tag, TibiaBlackjack } from 'components/Atoms'
import NextLink from 'next/link'
import { loadThumbnail } from 'utils'
import { routes } from 'Constants'
import { NewstickerProps } from './types'

const Newsticker = ({ blogPosts, className, ...props }: NewstickerProps) => {
  const { common } = useTranslations()

  return (
    <aside
      className={clsx(
        'inner-container bg-darkerPrimary lgr:gap-6 relative flex h-[134px] flex-col gap-3 pt-3 transition-colors md:h-[88px] md:flex-row md:items-center md:gap-4 md:pb-3',
        className,
      )}
      {...props}
    >
      <div
        className="z-1 from-darkerPrimary pointer-events-none absolute top-0 right-0 w-8 bg-gradient-to-l to-transparent"
        style={{ height: 'calc(100% - 6px)' }}
      />
      <h2 className="text-onPrimary tracking-wide md:hidden lg:block lg:w-min">
        {common.Newsticker}
      </h2>

      <div className="negative-container custom-scrollbar lgr:gap-6 flex gap-3 overflow-auto pb-3 before:w-2 before:flex-none after:w-2 after:flex-none md:m-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:before:content-[unset] md:after:content-[unset]">
        {blogPosts.map(({ slug, title, tags, thumbnail }) => (
          <article
            key={slug}
            className="group relative flex max-w-[80vw] flex-none items-center gap-3 md:max-w-none"
          >
            <div className="bg-primaryVariant relative top-0 grid shrink-0 place-items-center rounded-md p-2 shadow-md transition-all group-hover:-top-0.5">
              <FadeImage
                src={loadThumbnail(thumbnail, 48)}
                width={48}
                height={48}
                alt={title}
                unoptimized
                className="relative h-12 w-12"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-s line-clamp-2 text-onPrimary font-light leading-tight tracking-wide md:text-base md:leading-none">
                {title}
              </h3>

              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Tag
                    className="text-xs shadow-md"
                    key={tag}
                    tagId={tag}
                    style={{ padding: '4px 8px', borderRadius: '5px' }}
                  />
                ))}
              </div>
            </div>

            <NextLink
              href={`${routes.BLOG}/${slug}`}
              className="absolute top-0 left-0 h-full w-full text-transparent"
            >
              {title}
            </NextLink>
          </article>
        ))}
      </div>

      <TibiaBlackjack.Banner className="hidden md:block" />
    </aside>
  )
}

export default Newsticker
