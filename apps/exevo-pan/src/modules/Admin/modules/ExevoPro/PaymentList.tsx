import clsx from 'clsx'
import { useState, useMemo, useCallback } from 'react'
import { trpc } from 'lib/trpc'
import { debounce } from 'utils'
import {
  Paginator,
  LoadingAlert,
  Table,
  Input,
  Checkbox,
  Dialog,
  Button,
  CharacterLink,
} from 'components/Atoms'

const PAGE_SIZE = 30
const DEBOUNCE_DELAY = 700

const EMPTY_CONFIRMATION = {
  character: '',
  id: '',
  confirmed: false,
}

const PaymentList = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [nickname, setNickname] = useState('')

  const [toConfirm, setToConfirm] = useState(EMPTY_CONFIRMATION)

  const resetConfirmation = useCallback(
    () => setToConfirm(EMPTY_CONFIRMATION),
    [],
  )

  const list = trpc.listProOrders.useQuery(
    { pageIndex, nickname },
    {
      keepPreviousData: true,
    },
  )

  const updateProOrders = trpc.updateProOrders.useMutation({
    onSuccess: () => {
      list.refetch()
      resetConfirmation()
    },
  })

  const isLoading = list.isFetching || updateProOrders.isLoading

  return (
    <section>
      {isLoading && <LoadingAlert>Loading...</LoadingAlert>}

      <Table>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row">
          <Input
            allowClear
            label="Search by character"
            placeholder="e.g. 'Bubble'"
            className="w-full sm:max-w-[200px]"
            onChange={useMemo(
              () =>
                debounce(
                  (e: React.ChangeEvent<HTMLInputElement>) =>
                    setNickname(e.target.value),
                  DEBOUNCE_DELAY,
                ),
              [],
            )}
          />

          <Paginator
            pageSize={PAGE_SIZE}
            totalItems={list.data?.count ?? 0}
            currentPage={pageIndex + 1}
            onChange={(newIndex) => setPageIndex(newIndex - 1)}
            className="ml-auto w-fit"
          />
        </div>

        <Table.Element className="text-center">
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>Confirmed</Table.HeadColumn>
              <Table.HeadColumn>Character</Table.HeadColumn>
              <Table.HeadColumn highlighted desc>
                Date
              </Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {(list.data?.page ?? []).map(
              ({ id, paymentData: { character, lastUpdated, confirmed } }) => (
                <Table.Row
                  key={id}
                  className={clsx(
                    toConfirm.id === id &&
                      (toConfirm.confirmed
                        ? 'bg-greenHighlight/20'
                        : 'bg-red/20'),
                    'hover:bg-background',
                  )}
                >
                  <Table.Column>
                    <div className="mx-auto w-fit">
                      <Checkbox
                        checked={confirmed}
                        onClick={() =>
                          setToConfirm({
                            character:
                              character !== '' ? character : 'undefined',
                            id,
                            confirmed: !confirmed,
                          })
                        }
                      />
                    </div>
                  </Table.Column>
                  <Table.Column>
                    <CharacterLink
                      nickname={character}
                      className="text-primaryHighlight"
                    >
                      {character}
                    </CharacterLink>
                  </Table.Column>
                  <Table.Column>
                    {new Date(lastUpdated).toLocaleString('pt-BR', {
                      hour12: false,
                    })}
                  </Table.Column>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table.Element>
      </Table>

      <Dialog
        isOpen={!!toConfirm.character}
        onClose={resetConfirmation}
        heading="Do you really want to proceed?"
        noCloseButton
        className="grid max-w-[90vw] text-base"
      >
        <p className="mt-4 mb-6 flex flex-wrap items-center gap-2">
          <span
            className={`code ${
              toConfirm.confirmed ? 'text-greenHighlight' : 'text-red'
            }`}
          >
            {toConfirm.confirmed ? 'Confirm' : 'Unconfirm'}
          </span>
          <p className="code w-fit">{toConfirm.character}</p>
        </p>

        <div className="flex justify-end gap-1">
          <Button
            hollow
            pill
            onClick={resetConfirmation}
            disabled={updateProOrders.isLoading}
          >
            Cancel
          </Button>
          <Button
            pill
            onClick={() => updateProOrders.mutate(toConfirm)}
            loading={updateProOrders.isLoading}
            disabled={updateProOrders.isLoading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </section>
  )
}

export default PaymentList
