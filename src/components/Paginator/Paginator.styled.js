import styled from 'styled-components';

export default styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background-color: var(--primary);
    user-select: none;

    .sort-icon {
        width: 37px;
        height: 37px;
        fill: var(--onPrimary);
    }

    .paginating-wrapper {
        text-align: right;

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
                }

                &.disabled {
                    pointer-events: none;

                    svg {
                        fill: var(--separator);
                    }
                }

                

                &.mirror svg {
                    transform: rotate(180deg);
                }
            }
        }

        .tracker {
            display: block;
            font-size: 12px;
            letter-spacing: 0.5px;
            color: var(--onPrimary);
        }
    }
`;