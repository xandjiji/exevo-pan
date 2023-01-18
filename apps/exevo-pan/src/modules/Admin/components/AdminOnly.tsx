import { useSession } from 'next-auth/react'

type AdminOnlyProps = {
  children: React.ReactNode
}

const AdminOnly = ({ children }: AdminOnlyProps) => {
  const { data } = useSession()
  const isAdmin = data?.user.role === 'ADMIN'

  return <>{isAdmin ? children : null}</>
}

export default AdminOnly
