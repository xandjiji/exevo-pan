import styled from 'styled-components';

export default styled.div`
    padding: 16px;

    .items-wrapper {
        margin-left: -8px;
        margin-right: -8px;
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;

        > * {
            margin: 0 8px 32px 8px;
            margin-bottom: 32px;
            width: 320px;
        }
    }
`;