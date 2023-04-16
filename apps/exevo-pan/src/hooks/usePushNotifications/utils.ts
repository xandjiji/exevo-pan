import { WorkerStatus } from './types'

const isPushNotificationSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window

const getPermission = (): typeof Notification.permission => {
  if (isPushNotificationSupported()) return Notification.permission

  return 'default'
}

export const getWorkerStatus = (): WorkerStatus => ({
  permission: getPermission(),
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
  if (getPermission() === 'granted') {
    const worker = await navigator.serviceWorker.ready
    return worker.showNotification(title, {
      body: text,
      icon: iconUrl,
      data: { url: actionUrl },
    })
  }

  return null
}

export const getDeviceDescription = () =>
  isPushNotificationSupported() ? navigator.userAgent : ''
