import styled from 'styled-components';

export default styled.div`
    text-align: right;

    .tracker {
        display: block;
        font-size: 12px;
        letter-spacing: 0.5px;
        color: var(--onPrimary);
    }

    .cursor-wrapper {
        margin-top: 8px;
        display: flex;
        
        > *:not(:last-child) {
            margin-right: 16px;
        }

        .cursor {
            padding: 0;
            height: 32px;
            cursor: pointer;
            outline: none;

            svg {
                width: 32px;
                fill: var(--onPrimary);
                transition: opacity 0.2s ease-out
            }

            &.disabled {
                pointer-events: none;

                svg {
                    opacity: 0.4;
                }
            }

            

            &.mirror svg {
                transform: rotate(180deg);
            }
        }
    }
`;