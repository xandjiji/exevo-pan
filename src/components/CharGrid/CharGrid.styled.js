import styled from 'styled-components';

export default styled.div`
    height: 100%;

    .grid-header {
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
            outline: none;
        }
    }

    .items-wrapper {
        padding-top: 16px;
        height: 100%;
        overflow: auto;
        
        display: grid;
        grid-gap: 16px;
        grid-template-columns: repeat( auto-fit, minmax(320px, 1fr) );
        grid-auto-rows: auto;

        &::after {
            content: '';
            grid-column: 1 / -1;
            height: 1px;
        }
    }
`;