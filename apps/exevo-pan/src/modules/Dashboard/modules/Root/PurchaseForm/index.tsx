import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import Image from 'next/image'
import {
  Button,
  Input,
  OptionButton,
  Stepper,
  TitledCard,
} from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import { randomCharacter } from 'utils'
import { advertising } from 'Constants'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import FromTo from './FromTo'
import { generateQrCode } from './utils'

const { BANK_CHARACTER } = advertising

type PurchaseFormProps = {
  email: string
  initialTxId?: string | null
  initialCharacter?: string | null
  confirmed?: boolean
}

const PurchaseForm = ({
  email,
  initialTxId,
  initialCharacter,
  confirmed = false,
}: PurchaseFormProps) => {
  const { common, dashboard } = useTranslations()

  const [pixMode, setPixMode] = useState(false)

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    confirmed === false ? 'SUCCESSFUL' : 'IDLE',
  )

  const [formState, setFormState] = useState<{
    txId?: string | null
    character?: string | null
    pixUrl?: string | null
    qrCode?: string
  }>({ txId: initialTxId, character: initialCharacter })

  const orderAction = trpc.proPayment.useMutation({
    onMutate: () => {
      setRequestStatus('LOADING')
    },
    onError: () => {
      setRequestStatus('ERROR')
      toast.error(common.genericError)
    },
    onSuccess: async ({ paymentData }) => {
      if (paymentData) {
        const data: typeof formState = {}
        data.txId = paymentData.id

        if (paymentData.character) {
          data.character = paymentData.character
        } else {
          const { qrCode, payload } = await generateQrCode(email)
          data.qrCode = qrCode
          data.pixUrl = payload
        }

        setFormState(data)
      }

      setRequestStatus('SUCCESSFUL')
      toast.success(dashboard.PurchaseForm.orderReceived)
    },
  })

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
          {requestStatus !== 'SUCCESSFUL' && (
            <div>
              <div className="-mx-3">
                <OptionButton
                  active={!pixMode}
                  aria-label="Tibia Coins"
                  onClick={() => setPixMode(false)}
                  icon={
                    <Image
                      alt="Tibia Coin"
                      src={TibiaCoinsSrc}
                      width="24"
                      height="24"
                      className="pixelated"
                    />
                  }
                >
                  Tibia Coins
                </OptionButton>
                <OptionButton
                  active={pixMode}
                  aria-label="Pix"
                  onClick={() => setPixMode(true)}
                  icon={
                    <Image
                      alt="Pix"
                      src={PixSrc}
                      width="24"
                      height="24"
                      className="pixelated"
                    />
                  }
                >
                  Pix
                </OptionButton>
              </div>

              <div
                role="none"
                className="bg-separator mt-1 mb-3 h-[1px] w-full opacity-50"
              />

              {!pixMode && (
                <FromTo from={formState.character ?? ''} to={BANK_CHARACTER} />
              )}

              <div className="mt-1 flex items-end gap-4">
                {pixMode ? (
                  <p className="self-center text-base font-bold">
                    <span className="text-tsm font-light tracking-wide">
                      Total:
                    </span>{' '}
                    R$ 45,00
                  </p>
                ) : (
                  <Input
                    className="w-full"
                    name="character"
                    label={dashboard.PurchaseForm.paymentCharacterLabel}
                    placeholder={`e.g, '${randomNickname}'`}
                    value={formState.character ?? ''}
                    onChange={(e) => {
                      setFormState((prev) => ({
                        ...prev,
                        character: e.target.value,
                      }))
                      setRequestStatus('IDLE')
                    }}
                    enterKeyHint="send"
                    disabled={isLoading}
                    error={requestStatus === 'ERROR'}
                  />
                )}

                <Button
                  type="submit"
                  pill
                  className="ml-auto mb-[1px] py-3"
                  loading={isLoading}
                  disabled={
                    !pixMode &&
                    (!formState.character || formState.character.length < 2)
                  }
                  onClick={() =>
                    orderAction.mutate(
                      pixMode
                        ? {}
                        : { character: formState.character as string },
                    )
                  }
                >
                  {dashboard.PurchaseForm.confirm}
                </Button>
              </div>
            </div>
          )}

          {requestStatus === 'SUCCESSFUL' && (
            <div className="grid gap-5">
              <strong className="text-txl tracking-wide">
                {dashboard.PurchaseForm.orderReceived} 🎉
              </strong>

              {!!formState.txId && (
                <div className="grid gap-2">
                  <p id="tx-id">{dashboard.PurchaseForm.transactionId}:</p>
                  <p
                    aria-labelledby="tx-id"
                    className="code mx-auto w-fit text-center"
                  >
                    {formState.txId}
                  </p>
                </div>
              )}

              <p>{dashboard.PurchaseForm.notice}</p>

              {pixMode ? (
                <div />
              ) : (
                <FromTo
                  className="mx-auto"
                  from={formState.character ?? ''}
                  to={BANK_CHARACTER}
                />
              )}

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
