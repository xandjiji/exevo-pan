import styled from 'styled-components';

export default styled.div`
    padding: 6px 12px;
    background-color: var(--primaryVariant);
    color: var(--onSurface);
    border-radius: 12px;
    font-size: 12px;
    font-weight: 400;

    transition: 0.2s ease-out !important;

    &.active {
        background-color: var(--primary);
        color: var(--onPrimary);
    }

    &.interact:active {
        box-shadow: inset 2px 2px rgba(0,0,0,.14);
    }
`;