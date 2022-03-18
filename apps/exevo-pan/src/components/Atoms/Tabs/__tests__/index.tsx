import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Tabs from '..'
import { TabsProps } from '../types'

const tabs = [
  { label: 'Item 0', children: <div role="none">Item 0 content</div> },
  { label: <h1>Item 1</h1>, children: <div role="none">Item 1 content</div> },
  { label: 'Item 2', children: 'Item 2 content' },
]

const TabExample = (props: Partial<TabsProps>) => (
  <Tabs.Group {...props}>
    {tabs.map((tabItem) => (
      <Tabs.Panel {...tabItem} key={tabItem.label.toString()} />
    ))}
  </Tabs.Group>
)

const setup = (initialIndex = 0) => {
  const tabElements = screen.getAllByRole('tab')
  let currentSelected = initialIndex
  const assertCurrentSelected = () =>
    tabElements.forEach((element, index) => {
      const isSelected = currentSelected === index
      expect(element).toHaveAttribute(
        'aria-selected',
        isSelected ? 'true' : 'false',
      )
    })

  const clickAndAssert = (index: number) => {
    userEvent.click(screen.getAllByRole('tab')[index])
    currentSelected = index

    assertCurrentSelected()
    expect(screen.getByRole('tabpanel')).toHaveTextContent(
      `Item ${index} content`,
    )
  }

  return { assertCurrentSelected, clickAndAssert }
}

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

  test('should navigate properly between tabs', () => {
    renderWithProviders(<TabExample />)

    const { assertCurrentSelected, clickAndAssert } = setup()

    assertCurrentSelected()
    clickAndAssert(1)
    clickAndAssert(2)
    clickAndAssert(0)
    clickAndAssert(2)
  })

  test('`initialActive` should define the initial active tab', () => {
    const initialActive = 2
    renderWithProviders(<TabExample initialActive={initialActive} />)

    const { assertCurrentSelected, clickAndAssert } = setup(initialActive)

    assertCurrentSelected()
    clickAndAssert(2)
    clickAndAssert(0)
    clickAndAssert(2)
    clickAndAssert(1)
  })

  test.todo('should be able to be controlled by `activeIndex`')

  test.todo('`onChange` should be called with the current tab')
})
