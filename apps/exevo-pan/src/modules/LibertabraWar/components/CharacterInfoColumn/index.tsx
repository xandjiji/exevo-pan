import { memo } from 'react'
import { Table } from 'components/Atoms'
import { CharacterInfoColumnProps } from './types'

const CharacterInfoColumn = ({
  nickname,
  level,
  vocation,
  ...props
}: CharacterInfoColumnProps) => (
  <Table.Column {...props}>
    <a
      href={`https://www.tibia.com/community/?name=${encodeURIComponent(
        nickname,
      )}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      {nickname}
    </a>
    <span className="mt-1.5 block text-xs">{`Level ${level} - ${vocation}`}</span>
  </Table.Column>
)

export default memo(CharacterInfoColumn)
