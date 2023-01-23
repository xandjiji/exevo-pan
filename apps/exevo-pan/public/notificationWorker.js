self.addEventListener('push', (e) => {
  const { title, body } = e.data.json()
  self.registration.showNotification(title, {
    body,
    icon: 'https://www.exevopan.com/notification-icon.png',
  })
})
