import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;

    .toggle {
        position: relative;
        margin-right: 8px;
        width: 28px;
        height: 8px;
        border-radius: 16px;
        background-color: var(--separator);
        transition: background 0.2s ease-out;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);

            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: var(--surface);
            box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.3);
            transition: 0.2s ease-out;
        }
    }

    &.active {
        .toggle {
            background-color: var(--primaryVariant);
            &::after {
                left: 100%;
                transform: translate(-100%, -50%);
                background-color: var(--primary);
                box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.3);
            }
        }
    }
`