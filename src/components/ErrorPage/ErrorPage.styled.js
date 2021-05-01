import styled from 'styled-components';

export default styled.div`
    position: relative;
    z-index: 99;
    width: 100vw;
    height: 100vh;

    .top {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        height: 50%;
        background-color: #FFFFFF;

        span {
            font-size: 64px;
            font-weight: 700;
            letter-spacing: 8px;
            color: #3F51B5;
        }
    }

    .bottom {
        padding-top: 6px;
        width: 100%;
        height: 50%;
        background-color: #3F51B5;
        text-align: center;

        svg {
            margin-bottom: 32px;
            width: 128px;
            height: 128px;
            fill: #FFFFFF;
        }

        p {
            margin-bottom: 8px;
            font-size: 14px;
            letter-spacing: 1.5px;
            color: #FFFFFF;
        }
    }
`;

export const Nav = styled.nav`
    margin-top: 8px;

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        li {
            margin-top: 12px;

            &:not(:last-child) {
                margin-right: 12px;

                &::after {
                    content: '|';
                    margin-left: 12px;
                    font-size: 14px;
                    color: var(--separator);
                }
            }

            a {
                font-size: 14px;
                letter-spacing: 0.5px;
                color: var(--onPrimary);
            }
        }
    }
`