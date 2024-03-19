import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import {
  Button,
  CharacterLink,
  Chip,
  Dialog,
  LoadingAlert,
  Table,
  Text,
} from 'components/Atoms'

const EMPTY_TO_SEND = { tagId: '', withdrawCharacter: '', tcOut: 0 }

export const ReferralWithdraws = () => {
  const [toSend, setToSend] = useState(EMPTY_TO_SEND)
  const resetToSend = () => setToSend({ ...EMPTY_TO_SEND })

  const list = trpc.getAllWithdrawRequests.useQuery(undefined, {
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  })

  const sendAction = trpc.sendWithdraw.useMutation({
    onSuccess: () => {
      list.refetch()
      resetToSend()
      toast.success('Withdraw was sent')
    },
    onError: () => toast.error('Oops! Something went wrong'),
  })

  return (
    <section>
      {list.isFetching && <LoadingAlert>Loading...</LoadingAlert>}

      <Table>
        <Table.Element className="text-center">
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>Character</Table.HeadColumn>
              <Table.HeadColumn>Balance</Table.HeadColumn>
              <Table.HeadColumn>Total withdrawn</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {(list.data ?? []).map(
              ({ id, withdrawCharacter, coupon, tcIn, tcOut }) => (
                <Table.Row
                  key={id}
                  highlight={toSend.tagId === id ? 'green' : undefined}
                  hoverHighlight
                  onClick={() =>
                    setToSend({ tagId: id, tcOut: tcIn, withdrawCharacter })
                  }
                  className="cursor-pointer"
                >
                  <Table.Column title={coupon}>
                    <CharacterLink nickname={withdrawCharacter}>
                      {withdrawCharacter}
                    </CharacterLink>
                  </Table.Column>

                  <Table.Column>
                    <Chip className="mx-auto w-fit">
                      <Text.TibiaCoin value={tcIn} />
                    </Chip>
                  </Table.Column>
                  <Table.Column>
                    <Chip gray className="mx-auto w-fit">
                      <Text.TibiaCoin value={tcOut} />
                    </Chip>
                  </Table.Column>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table.Element>
      </Table>

      <Dialog
        isOpen={!!toSend.tagId}
        onClose={resetToSend}
        heading="Do you really want to proceed?"
        noCloseButton
        className="grid max-w-[90vw] text-base"
      >
        <p className="mt-4 mb-6 flex flex-wrap items-center gap-1">
          Send
          <Chip>
            <Text.TibiaCoin value={toSend.tcOut} />
          </Chip>
          to
          <Chip gray>
            <CharacterLink
              nickname={toSend.withdrawCharacter}
              className="text-onSurface"
            >
              {toSend.withdrawCharacter}
            </CharacterLink>
          </Chip>
        </p>

        <div className="flex justify-end gap-4">
          <Button
            hollow
            pill
            onClick={resetToSend}
            disabled={sendAction.isLoading}
          >
            Cancel
          </Button>
          <Button
            pill
            onClick={() => sendAction.mutate(toSend)}
            loading={sendAction.isLoading}
            disabled={sendAction.isLoading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </section>
  )
}
