import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
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
    expect(screen.getAllByRole('tabpanel')[index]).toHaveTextContent(
      `Item ${index} content`,
    )
  }

  return { assertCurrentSelected, clickAndAssert }
}

describe('<Tabs />', () => {
  test('should render everything properly', async () => {
    const { container } = renderWithProviders(
      <TabExample aria-label="Tablist label" />,
    )

    expect(
      screen.getByRole('tablist', { name: 'Tablist label' }),
    ).toBeInTheDocument()
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

  test('should be able to be controlled by `activeIndex`', () => {
    const { rerender } = renderWithProviders(
      <Tabs.Group activeIndex={2}>
        <Tabs.Panel label="item-0">item 0</Tabs.Panel>
        <Tabs.Panel label="item-1">item 0</Tabs.Panel>
        <Tabs.Panel label="item-2">item 0</Tabs.Panel>
      </Tabs.Group>,
    )

    const tabElements = screen.getAllByRole('tab')

    const rerenderAndAssert = (newActive: number) => {
      rerender(
        <Tabs.Group activeIndex={newActive}>
          <Tabs.Panel label="item-0">item 0</Tabs.Panel>
          <Tabs.Panel label="item-1">item 1</Tabs.Panel>
          <Tabs.Panel label="item-2">item 2</Tabs.Panel>
        </Tabs.Group>,
      )

      tabElements.forEach((tabItem, index) => {
        const isActive = index === newActive
        expect(tabItem).toHaveAttribute(
          'aria-selected',
          isActive ? 'true' : 'false',
        )
      })

      expect(screen.getAllByRole('tabpanel')[newActive]).toHaveTextContent(
        `item ${newActive}`,
      )
    }

    rerenderAndAssert(2)
    rerenderAndAssert(0)
    rerenderAndAssert(2)
    rerenderAndAssert(1)
  })

  test('`onChange` should be called with the current tab', () => {
    const onChangeMock = jest.fn()
    renderWithProviders(<TabExample onChange={onChangeMock} />)

    const tabElements = screen.getAllByRole('tab')

    let changeCount = 0
    const clickAndAssert = (index: number) => {
      userEvent.click(tabElements[index])
      changeCount += 1

      expect(onChangeMock).toHaveBeenCalledTimes(changeCount)
      expect(onChangeMock).toHaveBeenLastCalledWith(index)
    }

    clickAndAssert(1)
    clickAndAssert(0)
    clickAndAssert(2)
    clickAndAssert(1)
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(<TabExample />)
    await assertNoA11yViolations(container)
  })
})
