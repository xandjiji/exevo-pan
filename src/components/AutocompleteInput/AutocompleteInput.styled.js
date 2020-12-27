import styled from 'styled-components';

export default styled.div`
    position: relative;

    input {
        padding: 10px 16px;
        outline: none;
        border-radius: 5px;
        border: solid 1px var(--separator);
        font-size: 12px;
        transition: border-color 0.2s ease-out;
    }

    &.active input {
        border-color: var(--primary);
    }

    .item-list {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 50;
        width: 100%;
        height: 170px;
        overflow-y: auto;
        border-radius: 5px;
        background-color: var(--surface);
        pointer-events: all;
        transition: opacity 0.2s ease-out;

        > * {
            padding: 10px 16px;
            font-size: 12px;
            cursor: pointer;
            outline: none;
            transition: background-color 0.2s ease-out;

            &:hover, &.active {
                background-color: var(--primaryVariant);
            }
        }
    }

    

    &:not(.active) .item-list {
        opacity: 0;
        pointer-events: none;
    }
`;