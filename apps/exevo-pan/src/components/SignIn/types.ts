import { AuthProviders } from 'types/next-auth'

export type SignInProps = {
  providers?: AuthProviders
  state?: RequestStatus
}
