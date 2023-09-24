import { screen } from '@testing-library/react'
import { assertNoA11yViolations, renderWithProviders } from 'utils/test'
import Table from '..'

describe('<Table />', () => {
  test('should render all elements correctly', () => {
    renderWithProviders(
      <Table>
        <div role="none" />
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>#</Table.HeadColumn>
              <Table.HeadColumn>Nickname</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            <Table.Row>
              <Table.Column>1</Table.Column>
              <Table.Column>Ksu</Table.Column>
            </Table.Row>
            <Table.Row>
              <Table.Column>2</Table.Column>
              <Table.Column>Nana</Table.Column>
            </Table.Row>
          </Table.Body>
        </Table.Element>
      </Table>,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    const [firstHeadColumn, secondHeadColumn] =
      screen.getAllByRole('columnheader')
    expect(firstHeadColumn).toHaveTextContent('#')
    expect(secondHeadColumn).toHaveTextContent('Nickname')

    expect(screen.getAllByRole('rowgroup')).toHaveLength(2)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)

    const [, firstTableRow, secondTableRow] = rows
    expect(firstTableRow).toHaveTextContent('1')
    expect(firstTableRow).toHaveTextContent('Ksu')
    expect(secondTableRow).toHaveTextContent('2')
    expect(secondTableRow).toHaveTextContent('Nana')

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should display card head correctly with/without subtitles', () => {
    const { rerender } = renderWithProviders(
      <Table title="Main title">content</Table>,
    )

    const titleElement = screen.getByRole('heading')
    expect(titleElement).toHaveTextContent('Main title')

    rerender(
      <Table title="Main title" subtitle="subtitle content">
        content
      </Table>,
    )

    expect(titleElement).toHaveTextContent('Main title')
    expect(screen.getByText('subtitle content')).toBeInTheDocument()
  })

  test('caption element should NOT be visible', () => {
    renderWithProviders(
      <Table title="Main title">
        <div>visible content</div>
        <caption>hidden content</caption>
      </Table>,
    )

    expect(screen.getByText('visible content')).toBeInTheDocument()
    expect(screen.queryByRole('caption')).not.toBeInTheDocument()
  })

  test('head column highlight prop should display asc/desc symbol', () => {
    const { container, rerender } = renderWithProviders(
      <Table>
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn highlighted>#</Table.HeadColumn>
              <Table.HeadColumn>Nickname</Table.HeadColumn>
            </Table.Row>
          </Table.Head>
        </Table.Element>
      </Table>,
    )

    expect(container.children[1]).toMatchSnapshot()

    rerender(
      <Table>
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn highlighted desc>
                #
              </Table.HeadColumn>
              <Table.HeadColumn>Nickname</Table.HeadColumn>
            </Table.Row>
          </Table.Head>
        </Table.Element>
      </Table>,
    )

    expect(container.children[1]).toMatchSnapshot()
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <Table>
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>#</Table.HeadColumn>
              <Table.HeadColumn>Nickname</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            <Table.Row>
              <Table.Column>1</Table.Column>
              <Table.Column>Ksu</Table.Column>
            </Table.Row>
            <Table.Row>
              <Table.Column>2</Table.Column>
              <Table.Column>Nana</Table.Column>
            </Table.Row>
          </Table.Body>
        </Table.Element>
      </Table>,
    )
    await assertNoA11yViolations(container)
  })
})
