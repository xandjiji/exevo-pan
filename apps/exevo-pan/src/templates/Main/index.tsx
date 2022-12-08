/* eslint-disable react/require-default-props */
import Header from './Header'
import Footer from './Footer'

type MainProps = { clean?: boolean; children: JSX.Element | JSX.Element[] }

export default ({ clean = false, children }: MainProps) => (
  <div className="flex min-h-screen flex-col">
    <Header clean={clean} />
    {children}
    <Footer variant={clean ? 'surface' : 'primary'} />
  </div>
)
