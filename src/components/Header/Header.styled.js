import styled from 'styled-components';

export default styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    overflow-x: auto;

    nav ul {
        display: flex;
    }
    
    background-color: var(--primary);
`;

export const HeaderItem = styled.li`
    &:not(:last-child) {
        margin-right: 8px;
    }

    a {
        padding: 8px 16px;
        font-size: 14px;
        letter-spacing: 0.5px;
        color: var(--onPrimary);
        white-space: nowrap;
    }
`