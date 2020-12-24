import styled from 'styled-components';

export default styled.div`
    height: 100%;
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