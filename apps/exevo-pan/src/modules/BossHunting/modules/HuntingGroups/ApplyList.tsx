import clsx from 'clsx'
import { Table, Chip } from 'components/Atoms'
import { Menu } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { MoreHorizontalIcon, CheckIcon, CrossIcon } from 'assets/svgs'
import type { GuildApplication, GuildMember } from '@prisma/client'

/* @ ToDo: i18n */

type ApplyListProps = {
  list: GuildApplication[]
  onAction: (args: {
    newMember?: GuildMember
    application: GuildApplication
  }) => void
  allowAction: boolean
}

const ApplyList = ({ list, onAction, allowAction }: ApplyListProps) => {
  const manageApplication = trpc.manageGuildApplication.useMutation({
    onSuccess: onAction,
  })

  return (
    <Table>
      {list.length > 0 ? (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>Name</Table.HeadColumn>
              <Table.HeadColumn>Message</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {list.map(({ id, applyAs, createdAt, message }) => (
              <Table.Row key={id}>
                <Table.Column>
                  <div className="xs:child:whitespace-nowrap grid w-min justify-center gap-1.5 text-center">
                    <span
                      className="text-primaryHighlight overflow-hidden text-ellipsis text-base"
                      title={applyAs}
                    >
                      {applyAs}
                    </span>
                    <span className="text-tsm font-light">
                      {createdAt.toLocaleString('pt-BR', {
                        hour12: false,
                      })}
                    </span>
                  </div>
                </Table.Column>
                <Table.Column className="w-full !py-2 px-4">
                  {!!message && (
                    <Chip gray className="whitespace-pre-line !py-3 !px-3">
                      {message}
                    </Chip>
                  )}
                </Table.Column>
                {allowAction && (
                  <Table.Column>
                    <Menu
                      offset={[0, 8]}
                      items={[
                        {
                          label: 'Accept',
                          icon: ({ className, ...props }) => (
                            <CheckIcon
                              className={clsx('!fill-green', className)}
                              {...props}
                            />
                          ),
                          onSelect: () =>
                            toast.promise(
                              manageApplication.mutateAsync({
                                applicationId: id,
                                accept: true,
                              }),
                              {
                                success: `${applyAs} has joined the party`,
                                error: 'Oops! Something went wrong!',
                                loading: 'Loading...',
                              },
                            ),
                        },
                        {
                          label: 'Reject',
                          icon: ({ className, ...props }) => (
                            <CrossIcon
                              className={clsx('!fill-red', className)}
                              {...props}
                            />
                          ),
                          onSelect: () =>
                            toast.promise(
                              manageApplication.mutateAsync({
                                applicationId: id,
                                accept: false,
                              }),
                              {
                                success: 'Application rejected successfully!',
                                error: 'Oops! Something went wrong!',
                                loading: 'Loading...',
                              },
                            ),
                        },
                      ]}
                    >
                      <MoreHorizontalIcon className="fill-onSurface h-4 w-4" />
                    </Menu>
                  </Table.Column>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Element>
      ) : (
        <EmptyState text="No applications" variant="medium" className="my-4" />
      )}
    </Table>
  )
}

export default ApplyList
