import styled from 'styled-components';

export default styled.div`
    height: 100vh;
    max-height: 800px;
    overflow-y: auto;
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

    .skills-wrapper {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
    }
`;