import { useState, useCallback } from 'react'
import { NewsletterClient } from 'services'
import { UseNewsletterState, RegisterStatus } from './types'

export const useNewsletter = (): UseNewsletterState => {
  const [request, setStatus] = useState<RegisterStatus>({
    status: 'IDLE',
  })

  const register = useCallback(
    async (email: string, locale: string): Promise<void> => {
      setStatus({ status: 'LOADING' })

      const message = await NewsletterClient.registerEmail(email, locale)
      const status: RequestStatus =
        message === 'success' ? 'SUCCESSFUL' : 'ERROR'
      setStatus({ status, message })
    },
    [],
  )

  return { request, register }
}
