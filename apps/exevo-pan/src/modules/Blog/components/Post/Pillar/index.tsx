import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useCurrentSection } from '../../../contexts/useCurrentSection'
import { generateSectionId } from '../../../utils'
import { debouncedScrollIntoView, generateNavId } from './utils'
import * as S from './styles'
import { PillarProps } from './types'

const Cloudy = () => (
  <div
    role="none"
    className="z-1 from-darkerPrimary pointer-events-none fixed right-0 top-0 h-9 w-8 bg-gradient-to-l to-transparent"
  />
)

const Pillar = ({ titles, className, ...props }: PillarProps) => {
  const {
    translations: { blog },
  } = useTranslations()

  const { currentSection } = useCurrentSection()

  useEffect(() => {
    if (currentSection) {
      debouncedScrollIntoView(currentSection.title)
    }
  }, [currentSection?.title])

  if (titles.length === 0) return null

  return (
    <nav
      className={clsx(
        'inner-container bg-darkerPrimary fixed top-[60px] left-0 z-10 flex w-full items-center py-2 shadow-md lg:static lg:block lg:h-min lg:bg-transparent lg:p-0 lg:shadow-none',
        className,
      )}
      {...props}
    >
      <span className="text-onPrimary lg:text-onSurface mr-6 block text-base lg:mr-0 lg:mb-[12px]">
        {blog.Pillar.title}
      </span>

      <ul
        className="custom-scrollbar lg:border-separator relative -my-2 flex overflow-auto scroll-smooth py-2 lg:m-0 lg:block lg:border-solid lg:p-[6px] lg:px-3"
        style={{ borderWidth: 0, borderLeftWidth: 1 }}
      >
        {titles.map((title) => (
          <S.Li
            id={generateNavId(title)}
            aria-current={
              currentSection && currentSection.title === title
                ? 'step'
                : undefined
            }
            key={title}
          >
            <a href={`#${generateSectionId(title)}`}>{title}</a>
          </S.Li>
        ))}
      </ul>

      <Cloudy />
    </nav>
  )
}

export default Pillar
