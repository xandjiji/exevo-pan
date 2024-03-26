export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/transaction-history',
    '/dashboard/auction-notifications',
    '/dashboard/devices',
    '/dashboard/referrals',
  ],
}
