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
  const [selectedDataId, setSelectedDataId] = useState('')
  const [exportedIds, setExportedIds] = useState<string[]>([])

  const fetchFrozenData = trpc.getFrozenBossCheckLogs.useQuery(selectedDataId, {
    enabled: selectedDataId.length > 0,
    onSuccess: ({ date, data }) => {
      const blob = new Blob([data], { type: 'aplication/json' })

      const elem = document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = `${date.toISOString()}.json`
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
      setExportedIds((prev) => [...prev, selectedDataId])
    },
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
          {frozenEntries.map(({ id, frozenAt }) => {
            const wasExported = exportedIds.includes(id)

            return (
              <Table.Row key={id} hoverHighlight>
                <Table.Column className="text-center">
                  {frozenAt.toLocaleString('pt-BR', { hour12: false })}
                </Table.Column>
                <Table.Column>
                  <button
                    type="button"
                    className="text-primaryHighlight mx-auto flex cursor-pointer items-center gap-2 disabled:pointer-events-none disabled:opacity-40"
                    disabled={wasExported}
                    onClick={() => setSelectedDataId(id)}
                  >
                    {fetchFrozenData.isFetching && selectedDataId === id ? (
                      <div role="none" className="loading-spinner h-3 w-3" />
                    ) : (
                      <DownloadIcon className="fill-primaryHighlight h-3 w-3" />
                    )}

                    {wasExported ? 'Exported' : 'Export'}
                  </button>
                </Table.Column>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Element>
    </Dialog>
  )
}

export default ExportDataDialog
