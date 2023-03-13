import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Table, Chip } from 'components/Atoms'
import { Menu } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { MoreHorizontalIcon, CheckIcon, CrossIcon } from 'assets/svgs'
import type { GuildApplication, GuildMember } from '@prisma/client'

type ApplyListProps = {
  list: GuildApplication[]
  onAction: (args: {
    newMember?: GuildMember
    application: GuildApplication
  }) => void
  allowAction: boolean
}

const ApplyList = ({ list, onAction, allowAction }: ApplyListProps) => {
  const {
    translations: { common, huntingGroups },
  } = useTranslations()
  const i18n = huntingGroups.ApplyList

  const manageApplication = trpc.manageGuildApplication.useMutation({
    onSuccess: onAction,
  })

  return (
    <Table>
      {list.length > 0 ? (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>{i18n.name}</Table.HeadColumn>
              <Table.HeadColumn>{i18n.message}</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {list.map(({ id, applyAs, createdAt, message }) => (
              <Table.Row key={id}>
                <Table.Column>
                  <div className="xs:child:whitespace-nowrap grid w-min justify-center gap-1.5 text-center">
                    <span
                      className="text-primaryHighlight text-tsm xs:text-base overflow-hidden text-ellipsis md:overflow-visible"
                      title={applyAs}
                    >
                      {applyAs}
                    </span>
                    <span className="xs:text-tsm text-xs font-light">
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
                          label: i18n.accept,
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
                                error: common.genericError,
                                loading: i18n.loading,
                              },
                            ),
                        },
                        {
                          label: i18n.reject,
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
                                success: i18n.rejectToast,
                                error: common.genericError,
                                loading: i18n.loading,
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
        <EmptyState text={i18n.emptyState} variant="medium" className="my-4" />
      )}
    </Table>
  )
}

export default ApplyList
