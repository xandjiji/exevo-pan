export const endpoints = {
  CURRENT_AUCTIONS: process.env.NEXT_PUBLIC_AUCTIONS_ENDPOINT as string,
  HISTORY_AUCTIONS: process.env.NEXT_PUBLIC_HISTORY_ENDPOINT as string,
  STATIC_DATA: process.env.NEXT_PUBLIC_STATIC_ENDPOINT as string,
  WAR_DATA: 'https://exevo-pan-war-data.netlify.app',
  TIBIADATA: 'https://api.tibiadata.com/v2/characters',
  MAIL_CHECKOUT: '/api/mail-checkout',
  FCM_SEND: 'https://fcm.googleapis.com/fcm/send',
}
