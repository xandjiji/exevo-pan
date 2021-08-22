import { useState, useEffect } from 'react'
import { debounce } from 'utils'
import * as S from './styles'
import { PillarProps } from './types'

const Pillar = ({ sections }: PillarProps): JSX.Element => {
  const [highlightedId, setHighlightedId] = useState<string | undefined>()

  useEffect(() => {
    const sectionElements =
      Object.values(sections).map((sectionItem) =>
        document.getElementById(sectionItem.id),
      ) ?? []

    const handleScroll = debounce(() => {
      const mostCentered = sectionElements
        .map((element) => ({
          element,
          relativeToTop: (element as Element).getBoundingClientRect().top - 60,
        }))
        .filter((element) => element.relativeToTop >= 0)
        .sort((a, b) => Math.abs(a.relativeToTop) - Math.abs(b.relativeToTop))
        .shift()

      if (mostCentered) {
        const { element } = mostCentered
        const navElement = document.getElementById(`${element?.id}-nav`)

        navElement?.scrollIntoView({
          block: 'nearest',
        })
        setHighlightedId(element?.id)
      }
    }, 250)

    handleScroll()

    const mainElement = document.querySelector('main') as Element

    mainElement.addEventListener('scroll', handleScroll, { passive: true })

    return () => mainElement.removeEventListener('scroll', handleScroll)
  })

  return (
    <S.Aside>
      <S.Nav>
        <S.Title>Contents</S.Title>
        <S.Ul>
          {sections.map((sectionItem) => (
            <S.Li
              key={sectionItem.id}
              id={`${sectionItem.id}-nav`}
              aria-current={
                highlightedId && highlightedId === sectionItem.id
                  ? 'step'
                  : undefined
              }
            >
              <a href={`#${sectionItem.id}`}>{sectionItem.title}</a>
            </S.Li>
          ))}
        </S.Ul>
      </S.Nav>
    </S.Aside>
  )
}

export default Pillar
