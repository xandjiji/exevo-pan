import { WorkerStatus } from './types'

const isPushNotificationSupported = () =>
  'serviceWorker' in navigator && 'PushManager' in window

export const getWorkerStatus = (): WorkerStatus => ({
  permission: Notification.permission,
  isSupported: isPushNotificationSupported(),
})

export const registerServiceWorker = () =>
  navigator.serviceWorker.register(`/notificationWorker.js`, {
    scope: '/',
  })

export const createSubscription = async () => {
  const worker = await navigator.serviceWorker.ready
  return worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY as string,
  })
}

export const sendClientNotification = async ({
  title,
  text,
  iconUrl = 'https://www.exevopan.com/notification-icon.png',
  actionUrl,
}: {
  iconUrl?: string
  title: string
  text: string
  actionUrl?: string
}) => {
  if (Notification.permission !== 'granted') return null
  const worker = await navigator.serviceWorker.ready
  return worker.showNotification(title, {
    body: text,
    icon: iconUrl,
    data: { url: actionUrl },
  })
}
