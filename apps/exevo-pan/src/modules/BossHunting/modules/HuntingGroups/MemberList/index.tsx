import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
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

const MemberList = ({
  title,
  guildName,
  members,
  currentMember,
  isEditor,
  isPrivate,
  ...props
}: MemberListProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.MemberList

  return (
    <Table title={title} subtitle={guildName} {...props}>
      {isPrivate && !currentMember ? (
        <div className="flex flex-col items-center gap-2">
          <LockIcon className="fill-separator h-28 w-28" />
          <h4 className="text-center text-2xl">{i18n.private}</h4>
        </div>
      ) : (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn className="w-28">{i18n.role}</Table.HeadColumn>
              <Table.HeadColumn className="mr-auto text-left">
                {i18n.name}
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
                        {role === 'ADMIN' && `👑 ${i18n.admin}`}
                        {role === 'MODERATOR' && i18n.moderator}
                      </span>
                    )}
                  </Table.Column>
                  <Table.Column>
                    <span className="flex items-center gap-2">
                      {member.name}{' '}
                      {isSelf && (
                        <i className="text-xs opacity-75">{i18n.self}</i>
                      )}
                    </span>
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
}

export default memo(MemberList)
