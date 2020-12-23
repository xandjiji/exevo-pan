import styled from 'styled-components';

export default styled.div`
    height: 100%;
    .items-wrapper {
        margin-left: -8px;
        margin-right: -14px;
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        height: 100%;
        overflow: auto;

        > * {
            margin: 0 8px 32px 8px;
            width: 100%;

            &:last-child {
                margin-bottom: 8px;
            }
        }

        @media(min-width: 768px) {
            > * {
                width: calc(50% - 24px);

                &:nth-last-child(2) {
                    margin-bottom: 8px;
                }
            }
        }
    }

    @media(min-width: 1024px) {
        max-width: 660px;
    }
`;