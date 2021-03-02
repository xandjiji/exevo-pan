import styled from 'styled-components';

export default styled.footer`
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);

    font-size: 14px;
    font-weight: 300;
    color: var(--onPrimary);

    .left-wrapper {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 300;
        color: var(--onPrimary);
    }

    a {
        font-size: unset;
    }

    .gitrepo {
        font-size: 0;
    }

    .gituser {
        margin-left: 3px;
        font-size: 14px;
        font-weight: 400;
        color: var(--onPrimary);
        letter-spacing: 0.2px;
    }

    svg {
        margin-right: 16px;
        padding: 0;
        border-radius: 50%;
        fill: var(--onPrimary);
    }

    .theme-wrapper {
        padding: 3px 6px;
        display: flex;
        align-items: center;
        font-size: 14px;

        svg {
            margin: 0 0 0 6px;
        }
    }
`;