import styled from 'styled-components'
import { Clickable, Smooth } from 'styles'

export const Wrapper = styled.div<{ tagColor: number }>`
  --tagColor: ${({ tagColor }) => tagColor};

  --active: 100%;
  --inactive: 0%;

  --background-light: 74%;
  --text-light: 30%;

  padding: 6px 16px;
  width: fit-content;
  border-radius: 9px;
  background-color: hsl(
    var(--tagColor),
    var(--active),
    var(--background-light)
  );

  font-size: 16px;
  font-weight: 700;
  color: hsl(var(--tagColor), var(--active), var(--text-light));

  ${Smooth}

  &[type='button'] {
    ${Clickable}
    background-color: hsl(var(--tagColor), var(--inactive), var(--background-light));
    color: hsl(var(--tagColor), var(--inactive), var(--text-light));

    &[aria-checked='true'] {
      background-color: hsl(
        var(--tagColor),
        var(--active),
        var(--background-light)
      );
      color: hsl(var(--tagColor), var(--active), var(--text-light));
    }
  }
`
