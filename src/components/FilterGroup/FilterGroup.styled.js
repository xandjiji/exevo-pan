import styled from 'styled-components';

export default styled.div`
    margin-bottom: 16px;
    padding-bottom: 8px;
    display: ${props => props.display || 'unset'};
    flex-wrap: wrap;
    border-bottom: solid 1px var(--separator);

    span {
        margin-bottom: 8px;
        width: 100%;
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 0.2px;
        color: var(--onSurface);
    }

    .chip-item {
        margin-bottom: 8px;
        pointer-events: all;
        letter-spacing: 0.3px;
        transition: box-shadow 0.2s ease-out;

        &.interact:not(:hover),
        &:not(.interact) {
            box-shadow: none;
        }

        &:not(:last-child) {
            margin-right: 8px;
        }
    }
`;