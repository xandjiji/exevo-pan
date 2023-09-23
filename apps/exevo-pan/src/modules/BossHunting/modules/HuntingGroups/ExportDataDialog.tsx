import { useState } from 'react'
import { Dialog, Table } from 'components/Atoms'
import { DownloadIcon } from 'assets/svgs'
import { trpc } from 'lib/trpc'
import type { GuildData } from './contexts/types'

type ExportDataDialogProps = {
  onClose: () => void
  frozenEntries: GuildData['frozenBossCheckLogEntries']
}

// @ ToDo: i18n

const ExportDataDialog = ({
  frozenEntries,
  onClose,
}: ExportDataDialogProps) => {
  const [dataId, setDataId] = useState('')

  const fetchFrozenData = trpc.getFrozenBossCheckLogs.useQuery(dataId, {
    enabled: !!dataId,
  })

  return (
    <Dialog heading="Export monthly check logs" isOpen onClose={onClose}>
      <Table.Element>
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn className="text-center">Date</Table.HeadColumn>
            <Table.HeadColumn />
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {frozenEntries.map(({ id, frozenAt }) => (
            <Table.Row key={id} hoverHighlight>
              <Table.Column className="text-center">
                {frozenAt.toLocaleString('pt-BR', { hour12: false })}
              </Table.Column>
              <Table.Column>
                <button
                  type="button"
                  className="text-primaryHighlight mx-auto flex cursor-pointer items-center gap-2"
                >
                  <DownloadIcon className="fill-primaryHighlight h-3 w-3" />{' '}
                  Export
                </button>
              </Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Element>
    </Dialog>
  )
}

export default ExportDataDialog
