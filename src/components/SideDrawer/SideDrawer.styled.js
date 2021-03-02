import styled from 'styled-components';

export default styled.div`
    height: 100vh;
    width: 90vw;
    max-width: 600px;
    border-radius: 0 0 4px 0;
    background-color: var(--surface);

    .drawer-header {
        padding-top: 22px;
        padding-bottom: 18px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--primary);

        font-size: 16px;
        letter-spacing: 0.5px;
        color: var(--onPrimary);

        .icon-group {
            display: flex;
            align-items: center;
        }
        
        svg {
            margin-right: 24px;
            width: 30px;
            height: 30px;
            fill: var(--onPrimary);
        }

        .reset-group {
            margin: -2px 0;
            transition: opacity 0.2s ease-out;

            &:not(.active) {
                opacity: 0;
                pointer-events: none;
            }

            span {
                margin-top: 2px;
                margin-left: 6px;
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 700;
            }

            svg {
                margin-right: 0;
                margin-left: 3px;
            }
        }
    }

    .items-wrapper {
        position: relative;
        height: calc(100% - 142px);
        overflow-y: auto;

        &::before {
            content: '';
            position: fixed;
            bottom: 48px;
            left: 0;
            z-index: 2;
            width: calc(100% - 6px);
            height: 36px;
            background-image: linear-gradient(to top, var(--surface), rgba(0,0,0,0));
            pointer-events: none;
        }

        .invisible-label {
            font-size: 0;
        }

        .chip-icon {
            margin-right: 6px;
        }

        .flag {
            width: 16px;
            height: 10px;
            box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.14);
        }
    }

    .skills-wrapper {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
    }

    .battleye-wrapper {
        display: flex;
        
        > * {
            display: flex;
            align-items: center;
        }

        .battleye-icon {
            margin: 0 6px 0 0;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: solid 1px #00000020;
            box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.14);
        }
    }

    .rare-items-wrapper {
        span div {
            margin-left: 2px;
        }

        #Items-input {
            margin-right: 12px;
        }

        > .chip-item {
            margin: 5px 0;
        }

        .reset-button {
            right: 24px;
        }
    }

    .chips-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        > * {
            margin-bottom: 0 !important;
            margin-top: 8px;
        }
    }
`;