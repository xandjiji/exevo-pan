import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { getProviders, signIn } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import { GoogleIcon, DiscordIcon } from 'assets/svgs'
import { addLocalePrefix } from 'utils'
import { AuthProviders } from 'types/next-auth'
import { routes } from 'Constants'
import { Button, Link } from '../Atoms'
import { SignInProps } from './types'

const SignIn = ({
  providers: providersProps,
  state: stateProps,
}: SignInProps) => {
  const {
    translations: { common },
  } = useTranslations()

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
  const loading = state === 'LOADING'

  const { locale } = useRouter()

  const handleSignIn = useCallback(
    (provider: BuiltInProviderType) =>
      providers
        ? () => {
            setState('LOADING')
            signIn(provider, {
              callbackUrl: addLocalePrefix({
                route: routes.DASHBOARD,
                locale,
                absolute: false,
              }),
            })
          }
        : undefined,
    [locale, providers],
  )

  return (
    <section className="card relative w-min p-4 px-6">
      <div
        role={loading ? 'alert' : 'none'}
        className={clsx(
          'absolute top-0 left-0 grid h-full w-full place-items-center overflow-hidden transition-opacity',
          !loading && 'pointer-events-none opacity-0',
        )}
      >
        <div className="bg-surface absolute top-0 left-0 grid h-full w-full opacity-60" />
        <div className="loading-spinner z-1 relative h-8 w-8" />
      </div>

      <h3 className="text-s mb-4 text-center font-normal tracking-wider">
        {common.SignIn.title}:
      </h3>

      <ul className="mx-auto flex w-fit flex-col gap-4">
        <li>
          <Button
            type="button"
            onClick={handleSignIn('google')}
            className="flex w-full items-center gap-3"
            disabled={loading}
          >
            <GoogleIcon className="h-5 w-5" />
            Google
          </Button>
        </li>

        <li>
          <Button
            type="button"
            onClick={handleSignIn('discord')}
            className="flex w-full items-center gap-3"
            disabled={loading}
          >
            <DiscordIcon className="h-5 w-5" />
            Discord
          </Button>
        </li>
      </ul>

      <small className="mx-auto mt-6 block text-center text-xs leading-relaxed tracking-wide">
        {common.SignIn.subtext}{' '}
        <Link href="/" className="text-primaryHighlight">
          {common.termsOfService}
        </Link>{' '}
        {common.and}{' '}
        <Link href="/" className="text-primaryHighlight">
          {common.privacyPolicy}
        </Link>
        .
      </small>
    </section>
  )
}

export default SignIn
