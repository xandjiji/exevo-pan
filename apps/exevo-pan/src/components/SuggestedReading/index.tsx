import { useTranslations } from 'contexts/useTranslation'
import Link from 'next/link'
import Image from 'next/image'
import { routes } from 'Constants'

const SuggestedReading = ({
  thumbnail,
  title,
  slug,
}: Pick<BlogPost, 'thumbnail' | 'title' | 'slug'>) => {
  const {
    translations: { common },
  } = useTranslations()
  return (
    <div>
      <p className="mb-2 text-xs tracking-wide">
        {common.SuggestedReading.miniTitle}
      </p>

      <Link className="group" href={`${routes.BLOG}/${slug}`}>
        <div className="card flex items-center gap-2 p-1.5">
          <div className="bg-primaryVariant relative left-0 rounded-md p-1 transition-all group-hover:left-[3px]">
            <Image src={thumbnail} width={32} height={32} alt={title} />
          </div>

          <h5 className="text-base">{title}</h5>
        </div>
      </Link>
    </div>
  )
}

export default SuggestedReading
