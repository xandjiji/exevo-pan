import { trpc } from 'lib/trpc'
import {
  LoadingAlert,
  Table,
  AuctionLink,
  Dialog,
  Button,
} from 'components/Atoms'

const PaymentList = () => {
  const list = trpc.listAuctionHighlights.useQuery()

  const isLoading = list.isFetching

  return (
    <section>
      {isLoading && <LoadingAlert>Loading...</LoadingAlert>}

      <Table>
        <Table.Element className="text-center">
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>Action</Table.HeadColumn>
              <Table.HeadColumn highlighted desc>
                Date
              </Table.HeadColumn>
              <Table.HeadColumn>Auction</Table.HeadColumn>
              <Table.HeadColumn>Days</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {(list.data ?? []).map(
              ({
                id,
                confirmed,
                active,
                auctionId,
                nickname,
                lastUpdated,
                days,
              }) => (
                <Table.Row key={id}>
                  <Table.Column>
                    <Button pill>👍 Confirm</Button>
                    <Button pill>📅 Update date</Button>
                    <Button pill>⏸️☑️ Pause</Button>
                    <Button pill>❌ Delete</Button>
                  </Table.Column>
                  <Table.Column>
                    {new Date(lastUpdated).toLocaleString('pt-BR', {
                      hour12: false,
                    })}
                  </Table.Column>
                  <Table.Column>
                    <AuctionLink auctionId={auctionId}>{nickname}</AuctionLink>
                  </Table.Column>
                  <Table.Column>days</Table.Column>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table.Element>
      </Table>

      {/* <Dialog
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
          <Button pill onClick={() => updateProOrders.mutate(toConfirm)}>
            Confirm
          </Button>
        </div>
      </Dialog> */}
    </section>
  )
}

export default PaymentList
