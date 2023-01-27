import { useState, useCallback } from 'react'
import { trpc } from 'lib/trpc'
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect'
import {
  getWorkerStatus,
  registerServiceWorker,
  createSubscription,
  sendClientNotification,
} from './utils'
import { WorkerStatus } from './types'

const usePushNotifications = () => {
  const [{ permission, isSupported }, setWorkerStatus] = useState<WorkerStatus>(
    {
      permission: 'default',
      isSupported: false,
    },
  )

  useIsomorphicLayoutEffect(() => setWorkerStatus(getWorkerStatus()), [])

  const notificationDevice = trpc.registerNotificationDevice.useMutation({
    onSettled: () => setWorkerStatus(getWorkerStatus()),
  })

  const subscribeDevice = useCallback(async () => {
    await registerServiceWorker()

    try {
      const pushDataKeys = await createSubscription()

      const { keys } = pushDataKeys.toJSON()

      notificationDevice.mutate({
        endpoint: pushDataKeys.endpoint,
        auth: keys?.auth ?? '',
        p256dh: keys?.p256dh ?? '',
      })
    } catch {
      setWorkerStatus(getWorkerStatus())
    }
  }, [])

  return {
    isSupported,
    permission,
    subscribeDevice,
    sendClientNotification,
    isLoading: notificationDevice.isLoading,
  }
}

export default usePushNotifications
