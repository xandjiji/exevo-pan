import styled from 'styled-components';

export default styled.div`
    position: relative;
    display: inline-flex;
    min-width: 20px;
    min-height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: solid 2px;
    border-color: ${props => props.color ? props.color : 'var(--separator)'};

    font-size: 12px;
    font-weight: 700;
    color: ${props => props.color ? props.color : 'var(--separator)'};

    div {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);

        padding: 12px;
        width: 160px;
        border-radius: 5px;
        background-color: var(--surface);
        opacity: 0;
        pointer-events: none;

        font-size: 12px;
        font-weight: 400;
        color: var(--onSurface);
        transition: opacity 0.2s ease-out;
    }

    &:hover div {
        opacity: 1;
        pointer-events: unset;
    }
`;