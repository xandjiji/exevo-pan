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

      const result = await notificationDevice.mutateAsync({
        endpoint: pushDataKeys.endpoint,
        auth: keys?.auth ?? '',
        p256dh: keys?.p256dh ?? '',
      })

      return result
    } catch (e) {
      setWorkerStatus(getWorkerStatus())
      throw e
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
