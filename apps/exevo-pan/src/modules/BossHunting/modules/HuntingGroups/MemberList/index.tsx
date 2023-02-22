import { memo } from 'react'
import { Table } from 'components/Atoms'
import type { GuildMember } from '@prisma/client'

type MemberListProps = {
  title: string
  guildName: string
  members: GuildMember[]
  isEditor: boolean
} & JSX.IntrinsicElements['div']

/* @ ToDo: i18n */

/* @ ToDo:

    - empty state (private)
    - edit dropdown

*/

const MemberList = ({
  title,
  guildName,
  members,
  isEditor,
  ...props
}: MemberListProps) => (
  <Table title={title} subtitle={guildName} {...props}>
    <Table.Element>
      <Table.Head>
        <Table.Row>
          <Table.HeadColumn className="w-28">Role</Table.HeadColumn>
          <Table.HeadColumn className="mr-auto text-left">
            Name
          </Table.HeadColumn>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {members.map(({ id, name, role }) => (
          <Table.Row key={id}>
            <Table.Column className="text-center">
              {role !== 'USER' && (
                <span className="bg-primary text-onPrimary rounded p-1 text-xs font-bold uppercase tracking-wider">
                  {role === 'ADMIN' && '👑 Admin'}
                  {role === 'MODERATOR' && 'Moderator'}
                </span>
              )}
            </Table.Column>
            <Table.Column className="flex items-center gap-2">
              {name}
            </Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Element>
  </Table>
)

export default memo(MemberList)
