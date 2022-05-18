import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import notFoundSrc from 'assets/notFound.png'

const EmptyState = () => {
  const {
    translations: { war },
  } = useTranslations()

  return (
    <div className="relative mt-4 flex w-full justify-center">
      <p
        className="z-1 text-onSurface absolute top-1/2 left-1/2 text-center text-[32px]"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {war.SearchGrid.MembersTable.EmptyState.p}
      </p>
      <Image
        alt={war.SearchGrid.MembersTable.EmptyState.alt}
        src={notFoundSrc}
        className="opacity-20 grayscale-[50%]"
      />
    </div>
  )
}

export default EmptyState
