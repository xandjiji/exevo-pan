import styled from 'styled-components';

export default styled.div`
    height: 100vh;
    max-height: 800px;
    width: 90vw;
    max-width: 560px;
    border-radius: 0 0 4px 0;
    background-color: var(--surface);

    .drawer-header {
        padding-top: 22px;
        padding-bottom: 18px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        background-color: var(--primary);

        font-size: 16px;
        letter-spacing: 0.5px;
        color: var(--onPrimary);
        
        svg {
            margin-right: 24px;
            width: 30px;
            height: 30px;
            fill: var(--onPrimary);
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
`;