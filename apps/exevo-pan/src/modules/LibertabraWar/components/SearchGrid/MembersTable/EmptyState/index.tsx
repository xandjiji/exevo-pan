import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import notFoundSrc from 'assets/notFound.png'

const EmptyState = () => {
  const {
    translations: { war },
  } = useTranslations()

  return (
    <div className="relative mt-4 flex w-full justify-center">
      <p className="z-1 text-onSurface absolute-centered text-center text-[32px]">
        {war.SearchGrid.MembersTable.EmptyState.p}
      </p>
      <Image
        alt={war.SearchGrid.MembersTable.EmptyState.alt}
        src={notFoundSrc}
        className="pixelated opacity-20 grayscale-[50%]"
      />
    </div>
  )
}

export default EmptyState
