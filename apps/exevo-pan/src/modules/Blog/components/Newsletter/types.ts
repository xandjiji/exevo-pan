export type RegisterStatus = {
  status: RequestStatus
  message?: string
}

export type UseNewsletterState = {
  state: RegisterStatus
  register: (email: string) => Promise<void>
}
