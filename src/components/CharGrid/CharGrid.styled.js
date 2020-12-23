import styled from 'styled-components';

export default styled.div`
    padding: 16px;

    .items-wrapper {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        > * {
            margin-bottom: 32px;
            width: 320px;
        }
    }
`;