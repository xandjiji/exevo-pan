import styled from 'styled-components';

export default styled.div`
    height: 80vh;
    width: 75vw;
    border-radius: 0 0 4px 0;
    background-color: var(--surface);

    .drawer-header {
        padding-top: 8px;
        padding-bottom: 8px;
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
        
    }
`;