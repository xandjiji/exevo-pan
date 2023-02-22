import { memo } from 'react'
import { Table } from 'components/Atoms'
import { LockIcon } from 'assets/svgs'
import type { GuildMember } from '@prisma/client'
import { ManageUser } from './ManageUser'

type MemberListProps = {
  title: string
  guildName: string
  members: GuildMember[]
  isEditor: boolean
} & JSX.IntrinsicElements['div']

/* @ ToDo: i18n */

const MemberList = ({
  title,
  guildName,
  members,
  isEditor,
  ...props
}: MemberListProps) => (
  <Table title={title} subtitle={guildName} {...props}>
    {members.length ? (
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
          {members.map((member) => (
            <Table.Row key={member.id}>
              <Table.Column className="text-center">
                {member.role !== 'USER' && (
                  <span className="bg-primary text-onPrimary rounded p-1 text-xs font-bold uppercase tracking-wider">
                    {member.role === 'ADMIN' && '👑 Admin'}
                    {member.role === 'MODERATOR' && 'Moderator'}
                  </span>
                )}
              </Table.Column>
              <Table.Column className="flex items-center gap-2">
                {member.name}
              </Table.Column>

              {isEditor && (
                <Table.Column className="w-6 text-center">
                  <ManageUser {...member} />
                </Table.Column>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Element>
    ) : (
      <div className="flex flex-col items-center gap-4">
        <LockIcon className="fill-separator h-28 w-28" />
        <h4 className="text-center text-2xl">This is a private group</h4>
      </div>
    )}
  </Table>
)

export default memo(MemberList)
