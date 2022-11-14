import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import { GoogleIcon, DiscordIcon } from 'assets/svgs'
import { AuthProviders } from 'types/Auth'
import { Button, Link } from '../Atoms'
import { SignInProps } from './types'

const SignIn = ({ providers: providersProps }: SignInProps) => {
  const [fetchedProviders, setProviders] = useState<AuthProviders | undefined>()
  const [state, setState] = useState<RequestStatus>('IDLE')

  useEffect(() => {
    if (!providersProps) {
      setState('LOADING')
      getProviders()
        .then((providers) => {
          if (providers) {
            setProviders(providers)
            setState('SUCCESSFUL')
          } else {
            setState('ERROR')
          }
        })
        .catch(() => setState('ERROR'))
    }
  }, [providersProps])

  const providers = providersProps ?? fetchedProviders

  return (
    <section className="card w-min p-4 px-6">
      <h3 className="text-s mb-4 text-center font-normal tracking-wider">
        Sign in with:
      </h3>

      <ul className="mx-auto flex w-fit flex-col gap-4">
        <li>
          <Button
            type="button"
            onClick={providers ? () => signIn(providers.google.id) : undefined}
            className="flex w-full items-center gap-4"
          >
            <GoogleIcon className="h-5 w-5" />
            Google
          </Button>
        </li>

        <li>
          <Button
            type="button"
            onClick={providers ? () => signIn(providers.discord.id) : undefined}
            className="flex w-full items-center gap-4"
          >
            <DiscordIcon className="h-5 w-5" />
            Discord
          </Button>
        </li>
      </ul>

      <small className="mx-auto mt-6 block text-center text-xs leading-relaxed tracking-wide">
        By signing in, you agree to our{' '}
        <Link href="/" className="text-primaryHighlight">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/" className="text-primaryHighlight">
          Privacy Policy
        </Link>
        .
      </small>
    </section>
  )
}

export default SignIn
