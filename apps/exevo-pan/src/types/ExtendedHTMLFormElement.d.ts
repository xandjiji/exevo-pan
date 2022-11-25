type TFormElements<Inputs> = Inputs & HTMLFormControlsCollection

declare type ExtendedHTMLFormElement<Inputs> = {
  readonly elements: TFormElements<Inputs>
} & HTMLFormElement
