import type { PaymentData } from '@prisma/client'
import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { LabeledCard, Input, Button, Text } from 'components/Atoms'
import { endpoints } from 'Constants'
import Pitch from './Pitch'

/* 
- confirm ACTION (loading state, api request, etc)
- payed state (delivery tooltip)
- componentizar <BuyNow />
*/

const UpgradeToPro = ({ character }: Partial<PaymentData>) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('IDLE')
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

  const isLoading = requestStatus === 'LOADING'

  return (
    <div className="grid gap-8">
      <Pitch />

      <LabeledCard labelText="Buy now">
        <span className="text-tsm flex items-center gap-1">
          Transfer
          {from ? (
            <>
              {' '}
              from <strong>{from}</strong>
            </>
          ) : null}
          <Text.Transfer currency="tc" amount={250} className="mx-1.5" />
          <a
            className="text-primaryHighlight font-bold"
            href="https://www.tibia.com/community/?name=Ksu"
            target="_blank"
            rel="noreferrer external"
          >
            Ksu
          </a>
        </span>

        <form name="test" onSubmit={onSubmit} className="flex items-end gap-4">
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
      </LabeledCard>
    </div>
  )
}

export default UpgradeToPro
