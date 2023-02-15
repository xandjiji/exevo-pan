export type SerializablePublicHuntingGroup = Omit<
  PublicHuntingGroup,
  'createdAt'
> & {
  createdAt: number
}

export type GuildGridProps = {
  serializableInitialGuildList: {
    page: SerializablePublicHuntingGroup[]
    count: number
  }
  serverOptions: Option[]
}
