import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useCurrentSection } from '../../../contexts/useCurrentSection'
import { generateSectionId } from '../../../utils'
import { debouncedScrollIntoView, generateNavId } from './utils'
import { PillarProps } from './types'

const Cloudy = () => (
  <div
    role="none"
    className="z-1 from-darkerPrimary pointer-events-none fixed right-0 top-0 h-9 w-8 bg-gradient-to-l to-transparent"
  />
)

const Pillar = ({ titles, className, ...props }: PillarProps) => {
  const { blog } = useTranslations()

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
      <span className="text-onPrimary lg:text-onSurface mr-6 block text-base lg:mr-0 lg:mb-3">
        {blog.Pillar.title}
      </span>

      <ul
        className="custom-scrollbar lg:border-separator relative -my-2 flex gap-6 overflow-auto scroll-smooth py-2 lg:m-0 lg:grid lg:gap-2 lg:border-solid lg:p-1.5 lg:px-3"
        style={{ borderWidth: 0, borderLeftWidth: 1 }}
      >
        {titles.map((title) => {
          const isCurrent = currentSection && currentSection.title === title

          return (
            <li
              key={title}
              id={generateNavId(title)}
              aria-current={isCurrent ? 'step' : undefined}
              className={clsx(
                "before:text-onPrimary h-min flex-none before:mr-1.5 before:font-bold before:transition-all before:content-['·']",
                !isCurrent && 'before:opacity-0',
                isCurrent
                  ? 'lg:before:text-primaryHighlight'
                  : 'lg:before:text-onSurface',
              )}
            >
              <a
                className={clsx(
                  'text-tsm text-onPrimary lg:hover:text-primary whitespace-nowrap font-light leading-relaxed transition-colors lg:whitespace-normal',
                  isCurrent ? 'lg:text-primaryHighlight' : 'lg:text-onSurface',
                )}
                href={`#${generateSectionId(title)}`}
              >
                {title}
              </a>
            </li>
          )
        })}
      </ul>

      <Cloudy />
    </nav>
  )
}

export default Pillar
