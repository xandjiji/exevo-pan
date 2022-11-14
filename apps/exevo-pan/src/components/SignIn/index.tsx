import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { getProviders, signIn } from 'next-auth/react'
import { GoogleIcon, DiscordIcon } from 'assets/svgs'
import { AuthProviders } from 'types/Auth'
import { Button, Link } from '../Atoms'
import { SignInProps } from './types'

const SignIn = ({
  providers: providersProps,
  state: stateProps,
}: SignInProps) => {
  const [fetchedProviders, setProviders] = useState<AuthProviders | undefined>()
  const [innerState, setState] = useState<RequestStatus>(
    providersProps ? 'IDLE' : 'LOADING',
  )

  useEffect(() => {
    if (!providersProps) {
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
  const state = stateProps ?? innerState

  return (
    <section className="card relative w-min p-4 px-6">
      <div
        role="alert"
        className={clsx(
          'absolute top-0 left-0 grid h-full w-full place-items-center overflow-hidden transition-opacity',
          state !== 'LOADING' && 'pointer-events-none opacity-0',
        )}
        style={{ borderRadius: 'inherit' }}
      >
        <div className="bg-surface absolute top-0 left-0 grid h-full w-full opacity-60" />
        <div className="loading-spinner z-1 after:bg-surface relative h-8 w-8 bg-transparent" />
      </div>

      <h3 className="text-s mb-4 text-center font-normal tracking-wider">
        Sign in with:
      </h3>

      <ul className="mx-auto flex w-fit flex-col gap-4">
        <li>
          <Button
            type="button"
            onClick={providers ? () => signIn('google') : undefined}
            className="flex w-full items-center gap-3"
          >
            <GoogleIcon className="h-5 w-5" />
            Google
          </Button>
        </li>

        <li>
          <Button
            type="button"
            onClick={providers ? () => signIn('discord') : undefined}
            className="flex w-full items-center gap-3"
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
