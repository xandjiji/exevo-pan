import styled from 'styled-components';

export default styled.div`
    position: relative;

    input {
        padding: 10px 42px 10px 16px;
        outline: none;
        width: 190px;
        border-radius: 5px;
        border: solid 1px var(--separator);
        background-color: var(--surface);
        font-size: 12px;
        color: var(--onSurface);
        transition: border-color 0.2s ease-out;
        transition: box-shadow 0.2s ease-out;

        &:focus {
            border-color: var(--primary);
        }

        &.valid {
            border-color: var(--green);
            color: var(--green);
        }

        &.invalid {
            border-color: var(--red);
            color: var(--red);
        }

        &::-webkit-calendar-picker-indicator {
            display: none;
        }
    }

    .reset-button {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);

        width: 24px;
        height: 24px;
        cursor: pointer;
        outline: none;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease-out;

        &::after,
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            height: 12px;
            width: 2px;
            border-radius: 2px;
            background-color: var(--onSurface);
        }

        &::before {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }

    &.active .reset-button {
        opacity: 1;
        pointer-events: unset;
    }
`;