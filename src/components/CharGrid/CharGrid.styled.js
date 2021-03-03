import styled from 'styled-components';

export default styled.div`
    height: 100vh;
    overflow: auto;
    background-color: var(--background);

    .grid-header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 50;
        padding-top: 8px;
        padding-bottom: 8px;

        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        background-color: var(--primary);
        user-select: none;


        .left-header-menu {
            display: flex;

            > *:not(:last-child) {
                margin-right: 8px;
            }

            .icon {
                width: 37px;
                height: 37px;
                fill: var(--onPrimary);
                outline: none;
            }

            .sorting-wrapper {
                position: relative;

                .options-wrapper {
                    position: absolute;
                    top: calc(100% + 0px);
                    left: 50%;
                    transform: translateX(-50%);

                    padding: 16px;
                    border-radius: 5px;
                    background-color: var(--surface);

                    > * {
                        width: max-content;

                        &:not(:last-child) {
                            margin-bottom: 12px;
                        }

                        &:first-child {
                            color: var(--onSurface);
                            margin-bottom: 22px;
                        }
                    }
                }
            }
        }
    }

    .items-wrapper {
        margin-top: 70px;
        padding-top: 16px;
        position: relative;
        
        display: grid;
        grid-gap: 16px;
        grid-template-columns: repeat( auto-fit, minmax(320px, 1fr) );
        grid-auto-rows: auto;

        background-color: var(--background);

        &::after {
            content: '';
            grid-column: 1 / -1;
            height: 48px;
        }

        &::before {
            content: '';
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 72px;
            background-image: linear-gradient(to top, var(--background), rgba(0,0,0,0));
            pointer-events: none;
        }
    }
`;