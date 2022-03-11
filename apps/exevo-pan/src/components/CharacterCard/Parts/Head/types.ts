export interface HeadProps
  extends Pick<
    CharacterObject,
    'id' | 'nickname' | 'outfitId' | 'level' | 'vocationId'
  > {
  serverName: string
  children?: React.ReactNode
}
