import { GetStaticProps } from 'next'
import { Button } from 'components/Atoms'
import { useSession, getProviders, signOut, signIn } from 'next-auth/react'
import { common } from 'locales'

type LoginStaticProps = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export default function Login({ providers }: LoginStaticProps) {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button type="button" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    )
  }
  return (
    <div className="text-onSurface bg-surface">
      {providers?.google && (
        <Button type="button" onClick={() => signIn(providers.google.id)}>
          Login with Google
        </Button>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const providers = await getProviders()

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
      },
      providers,
    },
  }
}
