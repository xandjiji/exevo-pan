import { useState, useCallback, useRef } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import type { PaymentData } from '@prisma/client'
import { Input, Button, Stepper, TitledCard } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { randomCharacter } from 'utils'
import { endpoints } from 'Constants'
import FromTo from './FromTo'
import { PurchaseFormProps } from './types'

const BANK_CHARACTER = 'Ksu'

const PurchaseForm = ({ id, character, confirmed }: PurchaseFormProps) => {
  const {
    translations: { account },
  } = useTranslations()

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    confirmed === false ? 'SUCCESSFUL' : 'IDLE',
  )
  const [from, setFrom] = useState(character)
  const [txId, setTxId] = useState(id)

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
      const response = await fetch(endpoints.SEND_PAYMENT, {
        method: 'PUT',
        body: JSON.stringify({ character: value }),
      })

      const { id: paymentId }: PaymentData = await response.json()
      setTxId(paymentId)

      const sucessful = response.status === 200
      setRequestStatus(sucessful ? 'SUCCESSFUL' : 'ERROR')
    },
    [],
  )

  const resetStep = useCallback(() => setRequestStatus('IDLE'), [])

  const isLoading = requestStatus === 'LOADING'
  const currentStep = requestStatus !== 'SUCCESSFUL' ? 0 : 1
  const isFinished = currentStep === 1

  const { current: randomNickname } = useRef(randomCharacter())

  return (
    <div className="grid w-full max-w-[360px] gap-8">
      <Stepper
        className="mx-auto w-full max-w-[240px]"
        isFinished={isFinished}
        currentStep={currentStep}
        steps={[
          { title: account.PurchaseForm.order, onClick: resetStep },
          { title: account.PurchaseForm.payment },
        ]}
      />
      <TitledCard
        variant="rounded"
        title={
          <h4>
            {currentStep === 0
              ? account.PurchaseForm.order
              : account.PurchaseForm.payment}
          </h4>
        }
      >
        <div className="text-tsm leading-tight">
          {requestStatus !== 'SUCCESSFUL' ? (
            <div className="grid gap-3">
              <FromTo from={from} to={BANK_CHARACTER} />

              <form onSubmit={onSubmit} className="flex items-end gap-4">
                <Input
                  className="w-full"
                  name="character"
                  label={account.PurchaseForm.paymentCharacterLabel}
                  placeholder={`e.g, '${randomNickname}'`}
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
                  {account.PurchaseForm.confirm}
                </Button>
              </form>
            </div>
          ) : (
            <div className="grid gap-5">
              <strong className="text-txl tracking-wide">
                {account.PurchaseForm.orderReceived} 🎉
              </strong>

              {txId && (
                <div className="grid gap-2">
                  <p>{account.PurchaseForm.transactionId}:</p>
                  <p className="code mx-auto w-fit text-center">{txId}</p>
                </div>
              )}

              <p>{account.PurchaseForm.notice}</p>

              <FromTo className="mx-auto" from={from} to={BANK_CHARACTER} />

              <Button className="mx-auto" pill hollow onClick={resetStep}>
                <EditIcon className="h-4 w-4" />
                {account.PurchaseForm.edit}
              </Button>
            </div>
          )}
        </div>
      </TitledCard>
    </div>
  )
}

export default PurchaseForm
