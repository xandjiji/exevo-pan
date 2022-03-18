import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Tabs from '..'

const tabs = [
  { label: 'Item 0', children: <div role="none">Item 0 content</div> },
  { label: <h1>Item 1</h1>, children: <div role="none">Item 1 content</div> },
  { label: 'Item 2', children: <div role="none">Item 2 content</div> },
]

const TabExample = () => (
  <Tabs.Group>
    {tabs.map((tabItem) => (
      <Tabs.Panel {...tabItem} key={tabItem.label.toString()} />
    ))}
  </Tabs.Group>
)

describe('<Tabs />', () => {
  test('should render everything properly', async () => {
    const { container } = renderWithProviders(<TabExample />)

    expect(screen.getByRole('none')).toHaveTextContent('Item 0 content')

    const tabElements = screen.getAllByRole('tab')
    const panelElements = container.querySelectorAll('[role="tabpanel"]')

    tabElements.forEach((tabElement, index) => {
      expect(tabElement).toHaveTextContent(`Item ${index}`)
      expect(tabElement).toHaveAttribute(
        'aria-controls',
        panelElements[index].id,
      )

      const isFirstElement = index === 0
      expect(tabElement).toHaveAttribute(
        'aria-selected',
        isFirstElement ? 'true' : 'false',
      )
    })

    panelElements.forEach((tabPanelElement, index) => {
      expect(tabPanelElement).toHaveAttribute(
        'aria-labelledby',
        tabElements[index].id,
      )

      const isFirstElement = index === 0
      expect(tabPanelElement).toHaveAttribute(
        'data-active',
        isFirstElement ? 'true' : 'false',
      )

      expect(tabPanelElement).toHaveTextContent(
        isFirstElement ? `Item ${index}` : '',
      )
    })
  })

  /* test('should navigate properly between tabs', () => {
    renderWithProviders(
      <Tabs.Group>
        <Tabs.Panel label="Item 1">
          <div role="none">Item 1 content</div>
        </Tabs.Panel>
        <Tabs.Panel label="Item 2">
          <div role="none">Item 2 content</div>
        </Tabs.Panel>
        <Tabs.Panel label="Item 3">
          <div role="none">Item 3 content</div>
        </Tabs.Panel>
      </Tabs.Group>,
    )

    const tabElements = screen.getAllByRole('tab')

    tabElements.forEach((element) => {})
  }) */

  test.todo('`initialActive` should define the initial active tab')

  test.todo('should be able to be controlled by`activeIndex`')

  test.todo('`onChange` should be called with the current tab')
})
