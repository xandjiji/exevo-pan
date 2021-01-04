import styled from 'styled-components';

export default styled.div`
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    background-color: var(--primary);

    font-size: 14px;
    font-weight: 300;
    color: var(--onPrimary);

    a {
        font-size: unset;
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
`;