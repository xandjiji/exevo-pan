import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    .radio {
        position: relative;
        margin-right: 6px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: solid 2px var(--separator);
        transition: box-shadow 0.2s ease-out;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            border-radius: 50%;
            width: 7px;
            height: 7px;
            background-color: var(--primary);
            opacity: 0;
            transition: opacity 0.2s ease-out;
        }
    }

    &:hover {
        .radio {
            box-shadow: 2px 2px 4px 1px rgba(0,0,0,0.09);
        }
    }

    &:active {
        .radio {
            box-shadow: inset 2px 2px rgba(0,0,0,.14);
        }
    }

    &.active {
        .radio {
            &::after {
                opacity: 1;
            }
        }
    }

    font-size: 14px;
    color: var(--onSurface);
`