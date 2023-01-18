import { renderWithProviders } from 'utils/test'
import { ContentWrapper, Hero, Newsletter, Layout } from '..'
import { table as Table } from '../Style/Table'

describe.skip('<Post />', () => {
  test('should pass this smoke test', () => {
    const { container } = renderWithProviders(
      <div>
        <Layout.Left>
          <Hero src="image.png" title="Hero" />
        </Layout.Left>
        <Layout.Center>
          <ContentWrapper>
            <Table>
              <table>
                <thead>
                  <tr>
                    <th align="center">End time</th>
                    <th align="center">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">
                      <code>xx:00</code>
                    </td>
                    <td align="center">96,04%</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <code>xx:15</code>
                    </td>
                    <td align="center">1,08%</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <code>xx:30</code>
                    </td>
                    <td align="center">1,68%</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <code>xx:45</code>
                    </td>
                    <td align="center">1,19%</td>
                  </tr>
                </tbody>
              </table>
            </Table>
          </ContentWrapper>
        </Layout.Center>
        <Layout.Right>
          <Newsletter />
        </Layout.Right>
      </div>,
    )

    expect(container.childElementCount).not.toEqual(0)
  })
})
