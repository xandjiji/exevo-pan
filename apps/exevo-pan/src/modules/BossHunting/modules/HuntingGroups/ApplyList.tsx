import clsx from 'clsx'
import { Table, Chip } from 'components/Atoms'
import { Menu } from 'components/Organisms'
import { MoreHorizontalIcon, CheckIcon, CrossIcon } from 'assets/svgs'
import type { GuildApplication } from '@prisma/client'

type ApplyListProps = {
  list: GuildApplication[]
}

const ApplyList = ({ list }: ApplyListProps) => (
  <Table>
    <Table.Element>
      <Table.Head>
        <Table.Row>
          <Table.HeadColumn>Name</Table.HeadColumn>
          <Table.HeadColumn>Message</Table.HeadColumn>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {list.map(({ id, applyAs, createdAt, message }) => (
          <Table.Row>
            <Table.Column>
              <div className="child:whitespace-nowrap grid w-min justify-center gap-1.5 text-center">
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
                  },
                  {
                    label: 'Reject',
                    icon: ({ className, ...props }) => (
                      <CrossIcon
                        className={clsx('!fill-red', className)}
                        {...props}
                      />
                    ),
                  },
                ]}
              >
                <MoreHorizontalIcon className="fill-onSurface h-4 w-4" />
              </Menu>
            </Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Element>
  </Table>
)

export default ApplyList
