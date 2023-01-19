import { memo } from 'react'
import { Table, CharacterLink } from 'components/Atoms'
import { CharacterInfoColumnProps } from './types'

const CharacterInfoColumn = ({
  nickname,
  level,
  vocation,
  ...props
}: CharacterInfoColumnProps) => (
  <Table.Column {...props}>
    <CharacterLink nickname={nickname}>{nickname}</CharacterLink>
    <span className="mt-1.5 block text-xs">{`Level ${level} - ${vocation}`}</span>
  </Table.Column>
)

export default memo(CharacterInfoColumn)
