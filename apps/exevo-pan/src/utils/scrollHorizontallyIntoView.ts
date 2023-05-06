export const scrollHorizontallyIntoView = (element: Element | HTMLElement) => {
  const { offsetLeft, parentElement } = element as HTMLElement
  parentElement?.scroll({ left: offsetLeft, behavior: 'smooth' })
}
