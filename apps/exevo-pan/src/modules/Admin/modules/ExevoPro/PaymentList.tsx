import { useCallback, useMemo, useState } from 'react'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import { calculateDiscountedExevoProPrice, debounce } from 'utils'
import {
  Button,
  CharacterLink,
  Checkbox,
  Chip,
  Dialog,
  Input,
  LoadingAlert,
  Paginator,
  Table,
  Text,
} from 'components/Atoms'

const PAGE_SIZE = 30
const DEBOUNCE_DELAY = 700

const EMPTY_CONFIRMATION = {
  id: '',
  displayName: '',
  confirmed: false,
  noBill: false,
  coupon: '',
}

const PaymentList = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [term, setTerm] = useState('')

  const [toConfirm, setToConfirm] = useState(EMPTY_CONFIRMATION)

  const resetConfirmation = useCallback(
    () => setToConfirm(EMPTY_CONFIRMATION),
    [],
  )

  const list = trpc.listProOrders.useQuery(
    { pageIndex, term },
    {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  )

  const updateProOrders = trpc.updateProOrders.useMutation({
    onSuccess: () => {
      list.refetch()
      resetConfirmation()
      toast.success('User was updated')
    },
    onError: () => toast.error('Oops! Something went wrong'),
  })

  return (
    <section>
      {list.isFetching && <LoadingAlert>Loading...</LoadingAlert>}

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
                    setTerm(e.target.value),
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
              <Table.HeadColumn>Price</Table.HeadColumn>
              <Table.HeadColumn>From</Table.HeadColumn>
              <Table.HeadColumn highlighted desc>
                Date
              </Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {(list.data?.page ?? []).map(
              ({
                id,
                email,
                paymentData: {
                  character,
                  lastUpdated,
                  confirmed,
                  discountPercent,
                  coupon,
                  noBill,
                },
              }) => {
                const calculatedPrice = calculateDiscountedExevoProPrice(
                  discountPercent ?? 0,
                  character ? 'TIBIA_COINS' : 'PIX',
                )
                return (
                  <Table.Row
                    key={id}
                    highlight={
                      toConfirm.id === id
                        ? toConfirm.confirmed
                          ? 'green'
                          : 'red'
                        : undefined
                    }
                    hoverHighlight
                  >
                    <Table.Column>
                      <div className="mx-auto w-fit">
                        <Checkbox
                          checked={confirmed}
                          onClick={() =>
                            setToConfirm({
                              displayName: (character || email) ?? 'NULL',
                              id,
                              confirmed: !confirmed,
                              noBill: false,
                              coupon: coupon ?? '',
                            })
                          }
                        />
                      </div>
                    </Table.Column>
                    <Table.Column>
                      <Chip gray className="mx-auto w-fit">
                        {character ? (
                          <Text.TibiaCoin value={calculatedPrice} />
                        ) : (
                          `R$ ${calculatedPrice},00`
                        )}
                      </Chip>
                    </Table.Column>
                    <Table.Column
                      title={email ?? undefined}
                      className={clsx(noBill && 'line-through')}
                    >
                      {character ? (
                        <CharacterLink
                          nickname={character}
                          className="text-primaryHighlight"
                        >
                          {character}
                        </CharacterLink>
                      ) : (
                        <span style={{ lineBreak: 'anywhere' }}>{email}</span>
                      )}
                    </Table.Column>
                    <Table.Column>
                      <span style={{ lineBreak: 'anywhere' }}>
                        {lastUpdated.toLocaleString('pt-BR', {
                          hour12: false,
                        })}
                      </span>
                    </Table.Column>
                  </Table.Row>
                )
              },
            )}
          </Table.Body>
        </Table.Element>
      </Table>

      <Dialog
        isOpen={!!toConfirm.displayName}
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
          <p className="code w-fit">{toConfirm.displayName}</p>
        </p>

        {!!toConfirm.coupon && (
          <div className="-mt-2 mb-6 grid w-fit gap-1">
            <p className="text-xs">Coupon:</p>
            <p className="code">{toConfirm.coupon}</p>
          </div>
        )}

        {toConfirm.confirmed && (
          <div className="w-fit">
            <Checkbox
              label="No billing"
              checked={toConfirm.noBill}
              onClick={() =>
                setToConfirm((prev) => ({ ...prev, noBill: !prev.noBill }))
              }
            />
          </div>
        )}

        <div className="flex justify-end gap-4">
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
