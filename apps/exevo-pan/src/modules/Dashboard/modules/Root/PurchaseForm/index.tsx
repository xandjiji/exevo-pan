import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import { useDebounce } from 'hooks'
import Image from 'next/image'
import {
  Button,
  Checkbox,
  CopyButton,
  Input,
  OptionButton,
  Stepper,
  TitledCard,
} from 'components/Atoms'
import { EditIcon } from 'assets/svgs'
import {
  calculateDiscountedExevoProPrice,
  randomCharacter,
  referralTracker,
} from 'utils'
import { advertising, exevoPro } from 'Constants'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import FromTo from './FromTo'
import { generateQrCode } from './utils'

const { BANK_CHARACTER } = advertising

function generateStripeLink({
  userId,
  email,
}: {
  userId: string
  email?: string
}) {
  return (
    'https://buy.stripe.com/dRmeVfctugkgfP5fHm4gg01' +
    `?client_reference_id=${userId}${email ? `&prefilled_email=${email}` : ''}`
  )
}

type PurchaseFormProps = {
  userId: string
  email: string
  initialTxId?: string | null
  initialCharacter?: string | null
  confirmed?: boolean
  initialCoupon?: string | null
  initialDiscountPercent?: number | null
}

const PurchaseForm = ({
  userId,
  email,
  initialTxId,
  initialCharacter,
  confirmed,
  initialCoupon,
  initialDiscountPercent,
}: PurchaseFormProps) => {
  const translations = useTranslations()
  const i18n = translations.dashboard.PurchaseForm

  const [mode, setMode] = useState<'PIX' | 'TIBIA_COINS' | 'STRIPE'>(() => {
    if (!initialTxId) return 'STRIPE'
    if (initialCharacter) return 'TIBIA_COINS'
    return 'PIX'
  })

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    confirmed === false ? 'SUCCESSFUL' : 'IDLE',
  )

  const [formState, setFormState] = useState<{
    txId?: string | null
    character?: string | null
    pixUrl?: string | null
    qrCode?: string
    coupon: string
    discountPercent: number
  }>({
    txId: initialTxId,
    character: initialCharacter,
    coupon: initialCoupon ?? '',
    discountPercent: initialDiscountPercent ?? 0,
  })

  const [storedCoupon, setStoredCoupon] = useState('')

  const calculatedPrice = calculateDiscountedExevoProPrice(
    formState.discountPercent,
    mode === 'PIX' ? 'PIX' : 'TIBIA_COINS',
  )

  useLayoutEffect(() => {
    if (mode !== 'PIX') return
    generateQrCode(email, calculatedPrice).then(({ qrCode, payload }) => {
      setFormState((prev) => ({ ...prev, qrCode, pixUrl: payload }))
    })
  }, [])

  const debouncedCoupon = useDebounce(formState.coupon)

  const validCoupon = debouncedCoupon.length >= 3
  const checkCouponAction = trpc.checkProCoupon.useQuery(debouncedCoupon, {
    enabled: validCoupon,
    onSuccess: (foundDiscountPercent) =>
      setFormState((prev) => ({
        ...prev,
        discountPercent: foundDiscountPercent,
      })),
  })

  useLayoutEffect(() => {
    const lsCoupon = referralTracker.getFromLS().coupon

    if (initialTxId && !initialCoupon && lsCoupon) {
      setStoredCoupon(lsCoupon)
      return
    }

    if (!lsCoupon) return
    setFormState((prev) => ({ ...prev, coupon: lsCoupon }))
  }, [])

  const orderAction = trpc.proPayment.useMutation({
    onMutate: () => {
      setRequestStatus('LOADING')
    },
    onError: () => {
      setRequestStatus('ERROR')
      toast.error(translations.common.genericError)
    },
    onSuccess: async ({ paymentData }) => {
      if (paymentData) {
        const data: typeof formState = {
          discountPercent: paymentData.discountPercent ?? 0,
          coupon: paymentData.coupon ?? '',
        }
        data.txId = paymentData.id

        if (paymentData.character) {
          data.character = paymentData.character
        } else {
          const { qrCode, payload } = await generateQrCode(
            email,
            calculatedPrice,
          )
          data.qrCode = qrCode
          data.pixUrl = payload
        }

        setFormState(data)
      }

      setRequestStatus('SUCCESSFUL')
      toast.success(i18n.orderReceived)
    },
  })

  const resetStep = useCallback(() => setRequestStatus('IDLE'), [])

  const isLoading = requestStatus === 'LOADING'
  const currentStep = requestStatus !== 'SUCCESSFUL' ? 0 : 1
  const isFinished = currentStep === 1

  const { current: randomNickname } = useRef(randomCharacter())

  const basePrice =
    mode === 'PIX' ? exevoPro.price.PIX : exevoPro.price.TIBIA_COINS
  const priceDiscount = basePrice - calculatedPrice

  const DiscountElement =
    formState.discountPercent > 0 ? (
      <span className="bg-primary text-tsm text-onPrimary ml-1 rounded py-1 px-1.5 font-bold tracking-wide opacity-90 shadow-md transition-all">
        -{Math.round((priceDiscount / basePrice) * 100)}%
      </span>
    ) : null

  const disabledSubmit = useMemo(() => {
    if (mode !== 'TIBIA_COINS') return false
    return !formState.character || formState.character.length < 2
  }, [mode, formState.character])

  return (
    <div className="grid w-full max-w-[360px] gap-8">
      <Stepper
        className="mx-auto w-full max-w-[240px]"
        isFinished={isFinished}
        currentStep={currentStep}
        steps={[
          { title: i18n.order, onClick: resetStep },
          { title: i18n.payment },
        ]}
      />
      <TitledCard
        variant="rounded"
        title={<h4>{currentStep === 0 ? i18n.order : i18n.payment}</h4>}
      >
        <div className="text-tsm leading-tight">
          {requestStatus !== 'SUCCESSFUL' && (
            <div>
              <div className="-mx-3">
                <OptionButton
                  active={mode === 'STRIPE'}
                  aria-label="Credit Card"
                  onClick={() => setMode('STRIPE')}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-onSurface"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  }
                >
                  Credit Card
                </OptionButton>
                <OptionButton
                  active={mode === 'TIBIA_COINS'}
                  aria-label="Tibia Coins"
                  onClick={() => setMode('TIBIA_COINS')}
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
                  active={mode === 'PIX'}
                  aria-label="Pix"
                  onClick={() => setMode('PIX')}
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

              {mode !== 'STRIPE' && (
                <Input
                  label={i18n.couponLabel}
                  placeholder={i18n.couponPlaceholder}
                  value={formState.coupon.toUpperCase()}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      coupon: e.target.value,
                      discountPercent:
                        e.target.value.length < 3 ? 0 : prev.discountPercent,
                    }))
                  }
                  stateIcon={
                    validCoupon && checkCouponAction.isLoading
                      ? 'loading'
                      : formState.discountPercent > 0
                      ? 'valid'
                      : 'neutral'
                  }
                  className="mb-2 w-48"
                />
              )}

              {formState.discountPercent > 0 && mode !== 'STRIPE' && (
                <Checkbox
                  checked
                  disabled
                  label={
                    <p>
                      <strong className="text-greenHighlight">
                        -
                        {mode === 'PIX'
                          ? `R$ ${priceDiscount},00`
                          : `${priceDiscount} TC`}
                      </strong>{' '}
                      {i18n.discountApplied}
                    </p>
                  }
                />
              )}

              {mode === 'TIBIA_COINS' && <div role="none" className="mb-4" />}

              {mode === 'TIBIA_COINS' && (
                <FromTo
                  from={formState.character ?? ''}
                  to={BANK_CHARACTER}
                  tc={calculatedPrice}
                >
                  {DiscountElement}
                </FromTo>
              )}

              <div className="mt-1 flex items-end gap-4">
                {mode === 'PIX' && (
                  <p className="self-center text-base font-bold">
                    <span className="text-tsm font-light tracking-wide">
                      {i18n.total}
                    </span>{' '}
                    <span className="inline-flex items-center gap-1.5">
                      R$ {calculatedPrice},00{' '}
                      {formState.discountPercent > 0 && (
                        <del className="text-s font-normal">
                          R$ {exevoPro.price.PIX},00
                        </del>
                      )}{' '}
                      {DiscountElement}
                    </span>
                  </p>
                )}

                {mode === 'TIBIA_COINS' && (
                  <Input
                    className="w-full"
                    name="character"
                    label={i18n.paymentCharacterLabel}
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

                {mode === 'STRIPE' ? (
                  <a
                    target="_blank"
                    href={generateStripeLink({ userId, email })}
                    className="ml-auto mb-[1px]"
                    rel="noreferrer"
                  >
                    <Button type="submit" pill className="!py-3">
                      {i18n.confirm}
                    </Button>
                  </a>
                ) : (
                  <Button
                    type="submit"
                    pill
                    className="ml-auto mb-[1px] !py-3"
                    loading={isLoading}
                    disabled={disabledSubmit}
                    onClick={() => {
                      if (mode === 'PIX') {
                        orderAction.mutate({ coupon: formState.coupon })
                      } else if (mode === 'TIBIA_COINS') {
                        orderAction.mutate({
                          character: formState.character as string,
                          coupon: formState.coupon,
                        })
                      }
                    }}
                  >
                    {i18n.confirm}
                  </Button>
                )}
              </div>
            </div>
          )}

          {requestStatus === 'SUCCESSFUL' && (
            <div className="grid gap-5">
              <strong className="text-txl tracking-wide">
                {i18n.orderReceived} 🎉
              </strong>

              {!!formState.txId && (
                <div className="grid gap-2">
                  <p id="tx-id">{i18n.transactionId}:</p>
                  <p
                    aria-labelledby="tx-id"
                    className="code mx-auto w-fit text-center"
                  >
                    {formState.txId}
                  </p>
                </div>
              )}

              <p>{i18n.notice}</p>

              {mode === 'PIX' && (
                <div>
                  <span className="code flex items-center gap-1.5 break-all text-xs">
                    {formState.pixUrl}
                    <CopyButton
                      copyString={formState.pixUrl as string}
                      className="!bg-primary child:fill-onPrimary shrink-0"
                    />
                  </span>
                  <p className="text-s mb-1.5 mt-[22px] text-center">
                    {i18n.qrCodeText}
                  </p>
                  <img
                    className="mx-auto block"
                    alt="QR Code"
                    src={formState.qrCode}
                    style={{ zoom: 1 / 2, imageRendering: 'pixelated' }}
                  />
                </div>
              )}

              {mode === 'TIBIA_COINS' && (
                <FromTo
                  className="mx-auto"
                  from={formState.character ?? ''}
                  to={BANK_CHARACTER}
                  tc={calculatedPrice}
                />
              )}

              <Button
                className="mx-auto"
                pill
                hollow
                onClick={() => {
                  if (storedCoupon) {
                    setStoredCoupon('')
                    setFormState((prev) => ({ ...prev, coupon: storedCoupon }))
                  }
                  resetStep()
                }}
              >
                <EditIcon className="h-4 w-4" />
                {i18n.edit}
              </Button>
            </div>
          )}
        </div>
      </TitledCard>
    </div>
  )
}

export default PurchaseForm
