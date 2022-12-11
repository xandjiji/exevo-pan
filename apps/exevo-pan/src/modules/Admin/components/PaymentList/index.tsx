import { useState, useEffect, useCallback } from 'react'
import type { User, PaymentData } from '@prisma/client'
import {
  Paginator,
  LoadingAlert,
  Table,
  Input,
  Checkbox,
} from 'components/Atoms'
import { endpoints } from 'Constants'

type Data = {
  page: Array<User & { paymentData: PaymentData }>
  count: number
}

const PAGE_SIZE = 30

const PaymentList = () => {
  const [{ page, count }, setData] = useState<Data>({ page: [], count: 0 })
  const [pageIndex, setPageIndex] = useState(0)
  const [requestState, setRequestState] = useState<RequestStatus>('IDLE')

  useEffect(() => {
    if (requestState === 'IDLE') {
      setRequestState('LOADING')

      fetch(
        `${endpoints.ADMIN_PAYMENTS}?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}`,
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
  }, [pageIndex, requestState])

  const confirmPayment = useCallback(
    ({ id, confirmed }: { id: string; confirmed: boolean }) => {
      setRequestState('LOADING')

      fetch(endpoints.ADMIN_PAYMENTS, {
        method: 'PATCH',
        body: JSON.stringify({ id, confirmed }),
      })
        .then(() => setRequestState('IDLE'))
        .catch(() => {
          setRequestState('ERROR')
        })
    },
    [],
  )

  return (
    <section>
      {requestState === 'LOADING' && <LoadingAlert>Loading...</LoadingAlert>}

      <Table>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row">
          <Input
            allowClear
            label="Search by character"
            placeholder="e.g. 'Bubble'"
            className="w-full sm:max-w-[200px]"
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
              <Table.HeadColumn>Date</Table.HeadColumn>
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
                          confirmPayment({ id, confirmed: !confirmed })
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
    </section>
  )
}

export default PaymentList
