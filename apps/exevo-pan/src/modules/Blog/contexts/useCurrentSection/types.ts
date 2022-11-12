export type Section = {
  title: string
  offset: number
  status: boolean
}

export interface CurrentSectionContextValues {
  setSectionStatus: (section: Section) => void
  currentSection: Section | null
}

export interface CurrentSectionProviderProps {
  children: JSX.Element | JSX.Element[]
}
