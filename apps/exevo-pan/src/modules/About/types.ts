export type KsuData = {
  characters: {
    error?: string
    data: {
      name: string
      vocation: string
      level: number
      world: string
    }
  }
}

export type SectionProps = {
  title: string
  id: string
}
