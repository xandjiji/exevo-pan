import { useState, useEffect, useMemo, useCallback } from 'react'
import type { User, PaymentData } from '@prisma/client'
import { debounce } from 'utils'
import {
  Paginator,
  LoadingAlert,
  Table,
  Input,
  Checkbox,
  Dialog,
  Button,
} from 'components/Atoms'
import { endpoints } from 'Constants'

type Data = {
  page: Array<User & { paymentData: PaymentData }>
  count: number
}

const PAGE_SIZE = 30
const DEBOUNCE_DELAY = 700

const EMPTY_CONFIRMATION = {
  character: '',
  id: '',
  confirmed: false,
}

const PaymentList = () => {
  const [{ page, count }, setData] = useState<Data>({ page: [], count: 0 })
  const [pageIndex, setPageIndex] = useState(0)
  const [nickname, setNickname] = useState('')
  const [requestState, setRequestState] = useState<RequestStatus>('IDLE')

  const [toConfirm, setToConfirm] = useState(EMPTY_CONFIRMATION)

  const resetConfirmation = useCallback(
    () => setToConfirm(EMPTY_CONFIRMATION),
    [],
  )

  useEffect(() => {
    if (requestState === 'IDLE') {
      setRequestState('LOADING')

      fetch(
        `${endpoints.ADMIN.PAYMENTS}?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}&nickname=${nickname}`,
      )
        .then((res) =>
          res.json().then((data) => {
            setData(data)
            setRequestState('SUCCESSFUL')
          }),
        )
        .catch(() => {
          setRequestState('ERROR')
        })
    }
  }, [pageIndex, nickname, requestState])

  const confirmPayment = useCallback(() => {
    setRequestState('LOADING')

    fetch(endpoints.ADMIN.PAYMENTS, {
      method: 'PATCH',
      body: JSON.stringify({
        id: toConfirm.id,
        confirmed: toConfirm.confirmed,
      }),
    })
      .then(() => setRequestState('IDLE'))
      .catch(() => {
        setRequestState('ERROR')
      })
      .finally(resetConfirmation)
  }, [toConfirm.id, toConfirm.confirmed, resetConfirmation])

  const isLoading = requestState === 'LOADING' || requestState === 'IDLE'

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
                debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                  setNickname(e.target.value)
                  setRequestState('IDLE')
                }, DEBOUNCE_DELAY),
              [],
            )}
          />

          <Paginator
            pageSize={PAGE_SIZE}
            totalItems={count}
            currentPage={pageIndex + 1}
            onChange={(newIndex) => {
              setRequestState('IDLE')
              setPageIndex(newIndex - 1)
            }}
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
            {page.map(
              ({ id, paymentData: { character, lastUpdated, confirmed } }) => (
                <Table.Row key={id}>
                  <Table.Column>
                    <div className="mx-auto w-fit">
                      <Checkbox
                        checked={confirmed}
                        onClick={() =>
                          setToConfirm({ character, id, confirmed: !confirmed })
                        }
                      />
                    </div>
                  </Table.Column>
                  <Table.Column>{character}</Table.Column>
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
          <Button hollow pill onClick={resetConfirmation}>
            Cancel
          </Button>
          <Button pill onClick={confirmPayment}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </section>
  )
}

export default PaymentList
