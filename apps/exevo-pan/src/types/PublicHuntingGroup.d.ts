declare type PublicHuntingGroup = {
  id: string
  name: string
  private: boolean
  server: string
  description: string | null
  createdAt: Date
  avatarId: number
  avatarDegree: number
  memberCount: number
}
