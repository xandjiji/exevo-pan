import styled from 'styled-components';

export default styled.div`
    padding: 16px;

    .items-wrapper {
        margin-top: 16px;
        > * {
            margin: 0 auto;
            width: 320px;

            &:not(:last-child) {
                margin-bottom: 32px;
            }
        }
    }
`;