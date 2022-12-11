import { useState, useEffect } from 'react'
import { endpoints } from 'Constants'

const INITIAL_VALUE = 'R$ 0,00'

const Revenue = () => {
  const [{ monthly, total, average }, setRevenue] = useState({
    monthly: INITIAL_VALUE,
    total: INITIAL_VALUE,
    average: INITIAL_VALUE,
  })

  useEffect(() => {
    fetch(endpoints.ADMIN_REVENUE).then((res) => res.json().then(setRevenue))
  }, [])

  return (
    <section className="card flex flex-col gap-4 sm:flex-row sm:gap-8">
      <div className="grid gap-1">
        <span className="text-base font-light">Monthly</span>
        <strong className="text-2xl">{monthly}</strong>
      </div>

      <div className="grid gap-1">
        <span className="text-base font-light">Total</span>
        <strong className="text-2xl">{total}</strong>
      </div>

      <div className="grid gap-1">
        <span className="text-base font-light">Monthly average</span>
        <strong className="text-2xl">{average}</strong>
      </div>
    </section>
  )
}

export default Revenue
