import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'
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

  const currentSection: Section | null = useMemo(() => {
    let lowestOffsetSection: Section | null = null

    currentSections
      .filter(({ status }) => status)
      .forEach((section) => {
        if (!lowestOffsetSection) {
          lowestOffsetSection = section
        } else if (section.offset < lowestOffsetSection.offset) {
          lowestOffsetSection = section
        }
      })
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
