import styled from 'styled-components';

export default styled.div`
    height: calc(100vh - 60px);
    overflow: auto;
    background-color: var(--background);
`;

export const GridHeader = styled.div`
    position: fixed;
    top: 60px;
    width: 100%;
    z-index: 50;
    padding-top: 10px;
    padding-bottom: 10px;

    display: flex;
    background-color: var(--surface);
    user-select: none;

    > *:not(:last-child) {
        margin-right: 12px;
    }
`;

export const ItemsWrapper = styled.div`
    margin-top: 46px;
    padding-top: 16px;
    position: relative;
    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    background-color: var(--background);

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
`;