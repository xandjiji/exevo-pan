import Image from 'next/image'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'
import { LoginIcon } from 'assets/svgs'
import { routes } from 'Constants'

const AccountButton = (): JSX.Element => {
  const { status, data } = useSession()

  return (
    <div className="h8 grid w-8 place-items-center overflow-visible">
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
            <Image
              src={data.user.picture}
              alt={data.user.name}
              width={32}
              height={32}
              unoptimized
              className="animate-rollIn rounded-full shadow"
            />
          ) : null,
        }[status]
      }
    </div>
  )
}

export default AccountButton
