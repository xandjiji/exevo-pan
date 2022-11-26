import { useRef } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { LoginIcon, DashboardIcon, LogoutIcon } from 'assets/svgs'
import { addLocalePrefix } from 'utils'
import { routes } from 'Constants'
import useHeaderPopup from './useHeaderPopup'

const AccountButton = (): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { status, data } = useSession()
  const ref = useRef<HTMLDivElement>(null)

  const { buttonBinders, action, Popup } = useHeaderPopup(ref)

  const { locale } = useRouter()

  return (
    <div className="h8 grid h-8 w-8 place-items-center" ref={ref}>
      {
        {
          loading: null,
          unauthenticated: (
            <NextLink
              href={routes.LOGIN}
              className="text-onPrimary animate-fadeIn grid place-items-center gap-0.5 whitespace-nowrap text-xs"
            >
              <LoginIcon className="!fill-onPrimary h-4 w-4" />
              Login
            </NextLink>
          ),
          authenticated: data?.user ? (
            <>
              <Popup>
                <div className="child:px-6 child:py-3 text-s child:cursor-pointer child:items-center child:flex child:gap-2 child:text-onSurface child:text-left grid">
                  <span
                    className={clsx(
                      '!hover:bg-surface pointer-events-none tracking-wide',
                      data.user.proStatus
                        ? '!text-primaryHighlight'
                        : '!text-separator',
                    )}
                  >
                    {data.user.name}
                  </span>

                  <div
                    role="none"
                    className="bg-separator opacity-50"
                    style={{ padding: 0, height: 1 }}
                  />

                  <NextLink
                    className="hover:bg-primaryVariant"
                    href={routes.DASHBOARD}
                    onClick={action.close}
                    role="menuitem"
                  >
                    <DashboardIcon className="fill-onSurface h-4 w-4" />
                    {common.Header.AccountButton.dashboard}
                  </NextLink>
                  <button
                    className="hover:bg-primaryVariant"
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      action.close()
                      signOut({
                        callbackUrl: addLocalePrefix({
                          route: routes.HOME,
                          locale,
                          absolute: true,
                        }),
                      })
                    }}
                  >
                    <LogoutIcon className="fill-onSurface h-4 w-4" />
                    {common.Header.AccountButton.logout}
                  </button>
                </div>
              </Popup>
              <button
                type="button"
                onClick={action.open}
                aria-label={common.Header.openUserMenu}
                {...buttonBinders}
              >
                <Image
                  src={data.user.picture}
                  alt={data.user.name}
                  width={32}
                  height={32}
                  unoptimized
                  className={clsx(
                    'clickable animate-fadeIn rounded-full border-2 border-solid shadow',
                    data.user.proStatus
                      ? 'border-primaryHighlight'
                      : 'bg-separator',
                  )}
                />
              </button>
            </>
          ) : null,
        }[status]
      }
    </div>
  )
}

export default AccountButton
