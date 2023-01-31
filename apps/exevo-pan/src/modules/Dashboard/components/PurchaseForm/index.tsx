import { useState, useCallback, useRef } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import { Input, Button, Stepper, TitledCard } from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { randomCharacter } from 'utils'
import { advertising } from 'Constants'
import FromTo from './FromTo'
import { PurchaseFormProps } from './types'

const { BANK_CHARACTER } = advertising

const PurchaseForm = ({ id, character, confirmed }: PurchaseFormProps) => {
  const {
    translations: { common, dashboard },
  } = useTranslations()

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    confirmed === false ? 'SUCCESSFUL' : 'IDLE',
  )
  const [from, setFrom] = useState(character)
  const [txId, setTxId] = useState(id)

  const { mutate } = trpc.proPayment.useMutation({
    onMutate: () => {
      setRequestStatus('LOADING')
    },
    onError: () => {
      setRequestStatus('ERROR')
      toast.error(common.genericError)
    },
    onSuccess: ({ paymentData }) => {
      if (paymentData) {
        setTxId(paymentData.id)
        setFrom(paymentData.character)
      }

      setRequestStatus('SUCCESSFUL')
      toast.success(dashboard.PurchaseForm.orderReceived)
    },
  })

  const onSubmit = useCallback(
    async (
      e: React.FormEvent<
        ExtendedHTMLFormElement<{ character: HTMLInputElement }>
      >,
    ) => {
      e.preventDefault()
      const { value } = e.currentTarget.elements.character
      mutate({ character: value })
    },
    [mutate],
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
          { title: dashboard.PurchaseForm.order, onClick: resetStep },
          { title: dashboard.PurchaseForm.payment },
        ]}
      />
      <TitledCard
        variant="rounded"
        title={
          <h4>
            {currentStep === 0
              ? dashboard.PurchaseForm.order
              : dashboard.PurchaseForm.payment}
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
                  label={dashboard.PurchaseForm.paymentCharacterLabel}
                  placeholder={`e.g, '${randomNickname}'`}
                  noAlert
                  defaultValue={character ?? from}
                  onChange={(e) => {
                    setFrom(e.target.value.trim())
                    setRequestStatus('IDLE')
                  }}
                  enterKeyHint="send"
                  disabled={isLoading}
                  error={requestStatus === 'ERROR'}
                />
                <Button
                  type="submit"
                  pill
                  className="mb-[1px] py-3"
                  loading={isLoading}
                  disabled={!from || from.length < 2}
                >
                  {dashboard.PurchaseForm.confirm}
                </Button>
              </form>
            </div>
          ) : (
            <div className="grid gap-5">
              <strong className="text-txl tracking-wide">
                {dashboard.PurchaseForm.orderReceived} 🎉
              </strong>

              {txId && (
                <div className="grid gap-2">
                  <p id="tx-id">{dashboard.PurchaseForm.transactionId}:</p>
                  <p
                    aria-labelledby="tx-id"
                    className="code mx-auto w-fit text-center"
                  >
                    {txId}
                  </p>
                </div>
              )}

              <p>{dashboard.PurchaseForm.notice}</p>

              <FromTo className="mx-auto" from={from} to={BANK_CHARACTER} />

              <Button className="mx-auto" pill hollow onClick={resetStep}>
                <EditIcon className="h-4 w-4" />
                {dashboard.PurchaseForm.edit}
              </Button>
            </div>
          )}
        </div>
      </TitledCard>
    </div>
  )
}

export default PurchaseForm
