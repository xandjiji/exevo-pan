import { useMemo } from 'react'

const useOptionsSet = (
  optionsList: Option[],
  selectedOptions: Set<string>,
): Option[] =>
  useMemo(
    () => optionsList.filter((option) => !selectedOptions.has(option.value)),
    [optionsList, selectedOptions],
  )

export default useOptionsSet
