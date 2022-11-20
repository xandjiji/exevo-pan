import { useRef } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { LoginIcon, SettingsIcon, LogoutIcon } from 'assets/svgs'
import { addLocalePrefix } from 'utils'
import { routes } from 'Constants'
import useHeaderPopup from './useHeaderPopup'

const AccountButton = (): JSX.Element => {
  const { status, data } = useSession()
  const ref = useRef<HTMLDivElement>(null)

  const { action, Popup } = useHeaderPopup(ref)

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
                  <span className="!text-primaryHighlight !hover:bg-surface pointer-events-none tracking-wide">
                    {data.user.name}
                  </span>

                  <div
                    role="none"
                    className="bg-separator opacity-50"
                    style={{ padding: 0, height: 1 }}
                  />

                  <NextLink
                    className="hover:bg-primaryVariant"
                    href={routes.ACCOUNT}
                    onClick={action.close}
                  >
                    <SettingsIcon className="fill-onSurface h-4 w-4" />
                    Settings
                  </NextLink>
                  <button
                    className="hover:bg-primaryVariant"
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
                    Logout
                  </button>
                </div>
              </Popup>
              <button type="button" onClick={action.open}>
                <Image
                  src={data.user.picture}
                  alt={data.user.name}
                  width={32}
                  height={32}
                  unoptimized
                  className="clickable animate-fadeIn rounded-full shadow"
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
