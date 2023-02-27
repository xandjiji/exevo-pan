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
  currentMember?: GuildMember
  isPrivate: boolean
} & JSX.IntrinsicElements['div']

/* @ ToDo: i18n */

const MemberList = ({
  title,
  guildName,
  members,
  currentMember,
  isEditor,
  isPrivate,
  ...props
}: MemberListProps) => (
  <Table title={title} subtitle={guildName} {...props}>
    {isPrivate && !currentMember ? (
      <div className="flex flex-col items-center gap-4">
        <LockIcon className="fill-separator h-28 w-28" />
        <h4 className="text-center text-2xl">This is a private group</h4>
      </div>
    ) : (
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
          {members.map((member) => {
            const { role } = member
            const isSelf = member.id === currentMember?.id

            return (
              <Table.Row key={member.id}>
                <Table.Column className="text-center">
                  {role !== 'USER' && (
                    <span className="bg-primary text-onPrimary rounded p-1 text-xs font-bold uppercase tracking-wider">
                      {role === 'ADMIN' && '👑 Admin'}
                      {role === 'MODERATOR' && 'Moderator'}
                    </span>
                  )}
                </Table.Column>
                <Table.Column>
                  <span className="flex items-center gap-2">{member.name}</span>
                </Table.Column>

                {(isEditor || isSelf) && (
                  <Table.Column className="w-6 text-center">
                    <ManageUser {...member} />
                  </Table.Column>
                )}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Element>
    )}
  </Table>
)

export default memo(MemberList)
