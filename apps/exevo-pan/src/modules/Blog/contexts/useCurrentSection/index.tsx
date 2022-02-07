import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { useRouter } from 'next/router'
import {
  CurrentSectionContextValues,
  CurrentSectionProviderProps,
  Section,
} from './types'

const DEFAULT_VALUES: CurrentSectionContextValues = {
  setSectionStatus: () => {},
  currentSection: null,
}

const CurrentSectionContext =
  createContext<CurrentSectionContextValues>(DEFAULT_VALUES)

export const CurrentSectionProvider = ({
  children,
}: CurrentSectionProviderProps): JSX.Element => {
  const [currentSections, setCurrentSections] = useState<Section[]>([])

  const { query } = useRouter()

  useEffect(() => setCurrentSections([]), [query])

  const setSectionStatus = useCallback(
    (updatingSection: Section) =>
      setCurrentSections((prevSections) => {
        const foundSection = prevSections.some(
          ({ title }) => updatingSection.title === title,
        )

        if (!foundSection) {
          return [...prevSections, updatingSection]
        }

        return prevSections.map((section) => {
          if (updatingSection.title === section.title) {
            return updatingSection
          }
          return section
        })
      }),
    [],
  )

  const lastSectionRef = useRef<Section | undefined>()
  const currentSection: Section | undefined = useMemo(() => {
    let lowestOffsetSection: Section | undefined

    const activeSections = currentSections.filter(({ status }) => status)
    const noActiveSections = activeSections.length === 0

    if (noActiveSections) {
      return lastSectionRef.current
    }

    activeSections.forEach((section) => {
      if (!lowestOffsetSection) {
        lowestOffsetSection = section
      } else if (section.offset < lowestOffsetSection.offset) {
        lowestOffsetSection = section
      }
    })

    lastSectionRef.current = lowestOffsetSection
    return lowestOffsetSection
  }, [currentSections])

  return (
    <CurrentSectionContext.Provider
      value={{
        currentSection,
        setSectionStatus,
      }}
    >
      {children}
    </CurrentSectionContext.Provider>
  )
}

export const useCurrentSection = (): CurrentSectionContextValues =>
  useContext(CurrentSectionContext)
