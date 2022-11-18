import type { PaymentData } from '@prisma/client'
import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { Input, Button, Text, CopyButton, Stepper } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { endpoints } from 'Constants'
import Pitch from './Pitch'

/* 
- confirm ACTION (loading state, api request, etc)
- payed state (delivery tooltip)
- componentizar <BuyNow />

- abstract titled card
    - aqui
    - advertise
    - highscores
*/

const BANK_CHARACTER = 'Ksu'

// eslint-disable-next-line react/require-default-props
const FromTo = ({ from, to }: { from?: string; to: string }) => (
  <span className="my-2 flex items-center justify-center gap-1">
    Transfer
    {from ? (
      <>
        {' '}
        from <strong>{from}</strong>{' '}
      </>
    ) : null}
    <Text.Transfer currency="tc" amount={250} className="mx-1.5" />
    <a
      className="text-primaryHighlight font-bold"
      href="https://www.tibia.com/community/?name=Ksu"
      target="_blank"
      rel="noreferrer external"
    >
      {to}
    </a>
    <CopyButton copyString={to} />
  </span>
)

const UpgradeToPro = ({ id, character, confirmed }: Partial<PaymentData>) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    confirmed === false ? 'SUCCESSFUL' : 'IDLE',
  )
  const [from, setFrom] = useState(character)

  const onSubmit = useCallback(
    async (
      e: React.FormEvent<
        ExtendedHTMLFormElement<{ character: HTMLInputElement }>
      >,
    ) => {
      e.preventDefault()
      const { value } = e.currentTarget.elements.character

      if (!value) return

      setRequestStatus('LOADING')
      const { status } = await fetch(endpoints.SEND_PAYMENT, {
        method: 'PUT',
        body: JSON.stringify({ character: value }),
      })

      const sucessful = status === 200
      setRequestStatus(sucessful ? 'SUCCESSFUL' : 'ERROR')
    },
    [],
  )

  const resetStep = useCallback(() => setRequestStatus('IDLE'), [])

  const isLoading = requestStatus === 'LOADING'
  const currentStep = requestStatus !== 'SUCCESSFUL' ? 0 : 1
  const isFinished = currentStep === 1

  return (
    <div className="grid gap-8">
      <Pitch />

      <div className="grid max-w-[360px] gap-8">
        <Stepper
          className="mx-auto w-full max-w-[240px]"
          isFinished={isFinished}
          currentStep={currentStep}
          steps={[{ title: 'Order', onClick: resetStep }, { title: 'Payment' }]}
        />
        <div className="card overflow-hidden rounded-xl p-0">
          <h4 className="bg-primary text-onPrimary px-6 py-3 text-2xl font-normal">
            {currentStep === 0 ? 'Order' : 'Payment'}
          </h4>

          <div className="text-tsm p-3 leading-tight">
            {requestStatus !== 'SUCCESSFUL' ? (
              <div className="grid gap-3">
                <FromTo from={from} to={BANK_CHARACTER} />

                <form onSubmit={onSubmit} className="flex items-end gap-4">
                  <Input
                    className="w-full"
                    name="character"
                    label="Sending coins character"
                    placeholder="e.g, 'Bubble'"
                    noAlert
                    defaultValue={character}
                    onChange={(e) => setFrom(e.target.value.trim())}
                    enterKeyHint="send"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    pill
                    className="mb-[1px] py-3"
                    loading={isLoading}
                    disabled={!from}
                  >
                    Confirm
                  </Button>
                </form>
              </div>
            ) : (
              <div className="grid gap-5">
                <strong className="text-txl tracking-wide">
                  Your order was received! 🎉
                </strong>

                <div className="grid gap-1">
                  <p>Transaction ID:</p>
                  <p className="code mx-auto w-fit">{id}</p>
                </div>

                <p>
                  Your purchase will be delivered right after your payment is
                  confirmed. If your order can&apos;t be completed, your coins
                  will be returned.
                </p>

                <FromTo from={from} to={BANK_CHARACTER} />

                <Button
                  className="!text-onSurface child:!fill-onSurface mx-auto opacity-50"
                  onClick={resetStep}
                  pill
                  hollow
                >
                  <EditIcon className="h-4 w-4" />
                  Edit your order
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradeToPro
