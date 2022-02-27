export interface HeadProps
  extends Pick<
    CharacterObject,
    'id' | 'nickname' | 'outfitId' | 'level' | 'vocationId'
  > {
  highlighted?: boolean
  serverName: string
}
