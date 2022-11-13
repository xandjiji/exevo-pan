import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
  const { data: session, status } = useSession()
  console.log(status)
  if (session) {
    return (
      <div>
        <p>olá, {session.user?.email}</p>
        <button type="button" onClick={() => signOut({})}>
          Deslogar
        </button>
      </div>
    )
  }

  return (
    <div>
      <p>vc esta deslogado</p>
      <button type="button" onClick={() => signIn()}>
        Login
      </button>
    </div>
  )
}
